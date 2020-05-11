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
VALUES ("Sales"), ("Finance"), ("HR"), ("Corporate");


INSERT INTO role (title, salary, department_id) 
VALUES ("Manager", 90000.00, 1), ("Accountant", 80000.00, 2), ("Director", 70000.00, 3), ("Vice_President", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jan", "Levinson", 4, null), ("Michael", "Scott", 1, 1), ("Oscar", "Martinez", 2, 2), ("Kevin", "Malone", 2, 2), ("Angela", "Martin", 2, 2), ("Toby", "Flenderson", 3, 2), ("Kelly", "Kapoor", 3, 2), ("Gabe", "Lewis", 3, 2), ("Dwight", "Schrute", 1, 2), ("Stanley", "Hudson", 1, 2), ("Phyllis", "Lapin", 1, 2);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


