create database if not exists "store";
use "store";
create TABLE admins (
    admin_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash CHAR(64) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    urlPhotoProfile VARCHAR(2000),
    coverPhoto : VARCHAR(2000) ,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    zip VARCHAR(10),
    country VARCHAR(100),
    created_at : Date,
);