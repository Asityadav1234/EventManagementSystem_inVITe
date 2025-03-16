from flask import Flask, render_template, request, redirect, url_for, session, flash
from database.db import connect_db
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# ---------------------------- AUTHORIZATION ----------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        role = request.form['role']

        conn = connect_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Users (Name, Email, Password, Role) VALUES (%s, %s, %s, %s)",
                    (name, email, password, role))
        conn.commit()
        conn.close()

        flash("Registration successful! Please log in.")
        return redirect(url_for('login'))

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        conn = connect_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE Email = %s", (email,))
        user = cur.fetchone()

        if user and check_password_hash(user[3], password):
            session['user_id'] = user[0]
            session['role'] = user[4]
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password!')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Events")
    events = cur.fetchall()

    return render_template('dashboard.html', events=events)

# ---------------------------- EVENT MANAGEMENT ----------------------------
@app.route('/add_event', methods=['POST'])
def add_event():
    if 'role' in session and session['role'] == 'Organizer':
        name = request.form['name']
        description = request.form['description']
        date = request.form['date']
        venue = request.form['venue']

        conn = connect_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO Events (EventName, Description, Date, Venue, OrganizerID) VALUES (%s, %s, %s, %s, %s)",
            (name, description, date, venue, session['user_id'])
        )
        conn.commit()
        conn.close()

        flash("Event added successfully!")
        return redirect(url_for('dashboard'))

    flash("Access denied!")
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True)

