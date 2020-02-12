
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(10) PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    birthdate VARCHAR(12) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    UNIQUE(id),
    UNIQUE(email)
    );

DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    week INT NOT NULL,
    title VARCHAR(45),
    text TEXT NOT NULL,
    UNIQUE(week)
    );


insert into reports(id,week,text) VALUES(1,4,'[{"id":0,"question":"Användar skall få fram titel på start sidan sidan","answer":"Användaren skall kunna se h4 taggen på undersidan - /chat"},{"id":1,"question":"Användaren skall kunna klicka på Week2 länk från reports/week/1","answer":"Användaren skall kunna se knappen Join chat med class join-chat-btn "}]');