CREATE DATABASE db_dedlilah;

USE db_dedlilah;

-- TABLA USUARIOS
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- TABLA LINKS
CREATE TABLE link(
    id INT(11) NOT NULL,
    title VARCHAR (150) NOT  NULL,
    url VARCHAR (255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE link
    ADD PRIMARY KEY (id);

ALTER TABLE link
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE link
    MODIFY user_id INT(11) NOT NULL;

DESCRIBE link;

ALTER TABLE link
    MODIFY user_id INT(11) NULL;
