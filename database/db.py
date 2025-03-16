import psycopg2
from config import DATABASE_CONFIG

def connect_db():
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        return conn
    except Exception as e:
        print(f"Error: {e}")
        return None
