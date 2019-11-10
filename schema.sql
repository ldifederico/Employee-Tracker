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
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  role_id INT,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (manager_id) REFERENCES role(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO department (name) VALUES ("administration");
INSERT INTO department (name) VALUES ("accounting");
INSERT INTO department (name) VALUES ("customer service");
INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("warehouse");

INSERT INTO role (title, salary, department_id) VALUES ("secretary", 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("administrative assistant", 65000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("director", 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("accountant", 75000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("manager of accounting", 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("customer service rep", 65000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("manager of customer services", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("salesman", 75000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("manager of sales", 80000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("inventory clerk", 60000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("manager of warehouse", 65000, 5);

INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Erin", "Hannon", 1, 3);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Pam", "Beesly", 2, 3);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Michael", "Scott", 3, NULL);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Kevin", "Malone", 4, 5);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Oscar", "Martinez", 4, 5);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Angela", "Martin", 5, 3);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Meredith", "Palmer", 6, 7);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Ryan", "Howard", 6, 7);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Kelly", "Kapoor", 7, 3);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Dwight", "Schrute", 8, 9);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Stanley", "Hudson", 8, 9);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Phyllis", "Vance", 8, 9);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Jim", "Halpert", 9, 3);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Roy", "Anderson", 10, 11);
INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("Darryl", "Philbin", 11, 3);
