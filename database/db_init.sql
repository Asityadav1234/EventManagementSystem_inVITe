CREATE DATABASE event_management;

\c event_management;

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) CHECK (Role IN ('Admin', 'Organizer', 'Attendee'))
);

CREATE TABLE Events (
    EventID SERIAL PRIMARY KEY,
    EventName VARCHAR(100) NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    Venue VARCHAR(100) NOT NULL,
    OrganizerID INTEGER REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE Registrations (
    RegID SERIAL PRIMARY KEY,
    UserID INTEGER REFERENCES Users(UserID) ON DELETE CASCADE,
    EventID INTEGER REFERENCES Events(EventID) ON DELETE CASCADE,
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled'))
);

CREATE TABLE Feedback (
    FeedbackID SERIAL PRIMARY KEY,
    EventID INTEGER REFERENCES Events(EventID) ON DELETE CASCADE,
    UserID INTEGER REFERENCES Users(UserID) ON DELETE CASCADE,
    Comments TEXT,
    Rating INTEGER CHECK (Rating BETWEEN 1 AND 5)
);
