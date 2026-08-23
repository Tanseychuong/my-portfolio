CREATE DATABASE portfolio;

USE portfolio;


CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE TABLE blogs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    content TEXT NOT NULL,

    image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE TABLE comments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    blog_id INT,

    name VARCHAR(100),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(blog_id)
    REFERENCES blogs(id)
    ON DELETE CASCADE

);



CREATE TABLE messages (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE TABLE visitors (

    id INT AUTO_INCREMENT PRIMARY KEY,

    ip_address VARCHAR(100),

    page VARCHAR(255),

    device VARCHAR(100),

    duration INT,

    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    image VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    technologies VARCHAR(255),
    featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);