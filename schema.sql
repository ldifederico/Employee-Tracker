DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
  name VARCHAR(30)
);

CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  role_id INT,
  manager_id INT DEFAULT NULL
);