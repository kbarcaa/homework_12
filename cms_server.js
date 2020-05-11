const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = (mysql.createConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rlatjdwls",
  database: "cms_db",
}));

connection.connect((err) => {
  if (err) throw err;
  start();
});

start = () => {
  inquirer
    .prompt([
      {
        name: "mainQuestion",
        type: "list",
        message: "Please choose one: ",
        choices: ["View all employees", "View employees by department"],
      },
    ])
    .then((res) => {
      if (res.mainQuestion === "View all employees") {
        showAllEmployees();
      }
      if (res.mainQuestion === "View employees by department") {
        showEmployeeDepartment();
      }
    });
};

showAllEmployees = () => {
  connection.query(
    `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary, m.first_name Manager_First_Name, m.last_name Manager_Last_Name
    FROM employee AS emp
    INNER JOIN role ON emp.role_id = role.id
    INNER JOIN department ON department_id = department.id
    LEFT JOIN employee AS m ON m.id = emp.manager_id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
};

showEmployeeDepartment = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;

    let dep = [];
    results.forEach((department) => {
      dep.push(department.name);
    });

    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "rawlist",
          message: "Please choose one",
          choices: dep,
        },
      ])
      .then((response) => {
        if (response.departmentName === "Sales") {
          connection.query(
            `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary 
            FROM employee AS emp
            INNER JOIN role ON emp.role_id = role.id
            INNER JOIN department ON department_id = department.id
            WHERE department.name = "Sales"`,
            function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            }
          );
        }
        if (response.departmentName === "Finance") {
          connection.query(
            `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary 
            FROM employee AS emp
            INNER JOIN role ON emp.role_id = role.id
            INNER JOIN department ON department_id = department.id
            WHERE department.name = "Finance"`,
            function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            }
          );
        }
        if (response.departmentName === "HR") {
          connection.query(
            `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary 
            FROM employee AS emp
            INNER JOIN role ON emp.role_id = role.id
            INNER JOIN department ON department_id = department.id
            WHERE department.name = "HR"`,
            function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            }
          );
        }
        if (response.departmentName === "Corporate") {
          connection.query(
            `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary 
            FROM employee AS emp
            INNER JOIN role ON emp.role_id = role.id
            INNER JOIN department ON department_id = department.id
            WHERE department.name = "Corporate"`,
            function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            }
          );
        }
      });
  });
};

