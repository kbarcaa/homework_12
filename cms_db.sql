DROP DATABASE IF EXISTS cms_db;

CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY(id)
);

INSERT INTO department (name) 
VALUES ("Sales"), ("Finance"), ("HR");


INSERT INTO role (title, salary, department_id) 
VALUES ("Manager", 90000.00, 1), ("Accountant", 80000.00, 2), ("Director", 50000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("Michael", "Scott", 1, Null), ("Oscar", "Martinez", 2, 1), ("Toby", "Flenderson", 3, 1);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


