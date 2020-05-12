const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");

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
  console.log(chalk.yellow.bold("\n Employee Management System \n"));
  inquirer
    .prompt([
      {
        name: "mainQuestion",
        type: "list",
        message: chalk.green("Please choose one: "),
        choices: [
          "View all employees",
          "View employees by department",
          "Add new employee",
          "Add new department",
          "Add new role",
          chalk.red.bold("EXIT"),
        ],
      },
    ])
    .then((res) => {
      if (res.mainQuestion === "View all employees") {
        showAllEmployees();
      }
      if (res.mainQuestion === "View employees by department") {
        showEmployeeByDepartment();
      }
      if (res.mainQuestion === "Add new employee") {
        addNewEmployee();
      }
      if (res.mainQuestion === "Add new department") {
        addNewDepartment();
      }
      if (res.mainQuestion === "Add new role") {
        addNewRole();
      }
      if (res.mainQuestion === chalk.red.bold("EXIT")) {
        console.log(
          chalk.yellow.bold("\n The application has been terminated \n")
        );
        connection.end();
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

showEmployeeByDepartment = () => {
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
          message: chalk.green("Please select one"),
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

addNewEmployee = () => {
  let rol = [];
  let manager = [];

  connection.query(`SELECT * FROM role`, (err, resRole) => {
    if (err) throw err;

    resRole.forEach((role) => {
      rol.push(role.title);
    });

    connection.query(
      `SELECT emp.id, emp.first_name, emp.last_name, title Job_Title, name Department, salary Salary, m.first_name Manager_First_Name, m.last_name Manager_Last_Name
      FROM employee AS emp
      INNER JOIN role ON emp.role_id = role.id
      INNER JOIN department ON department_id = department.id
      LEFT JOIN employee AS m ON m.id = emp.manager_id`,
      (err, results) => {
        if (err) throw err;
        results.forEach((employee) => {
          // console.table(employee)
          if (employee.id === 1 || employee.id === 2) {
            manager.push(employee.first_name + " " + employee.last_name);
          }
        });

        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: chalk.green("Enter employee's First name:"),
            },
            {
              name: "last_name",
              type: "input",
              message: chalk.green("Enter employee's Last name:"),
            },
            {
              name: "role",
              type: "rawlist",
              message: chalk.green("Select employee's role:"),
              choices: rol,
            },
            {
              name: "manager",
              type: "rawlist",
              message: chalk.green("Select employee's manager:"),
              choices: manager,
            },
          ])
          .then((answer) => {
            let roleID;
            resRole.forEach((role) => {
              if (answer.role === role.title) {
                roleID = role.id;
              }
            });

            let managerID;
            results.forEach((employee) => {
              if (
                answer.manager ===
                employee.first_name + " " + employee.last_name
              ) {
                managerID = employee.id;
              }
            });

            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: roleID,
                manager_id: managerID,
              },
              (err) => {
                if (err) throw err;
                console.log(
                  chalk.magenta.bold(
                    "\n New employee was successfully added into the database."
                  )
                );
                start();
              }
            );
          });
      }
    );
  });
};

addNewDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDeptName",
        type: "input",
        message: chalk.green("Enter name of new department:"),
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newDeptName,
        },
        (err) => {
          if (err) throw err;
          console.log(
            chalk.magenta.bold("\n New department was successfully created.")
          );
          start();
        }
      );
    });
};

addNewRole = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;

    let dep = [];
    results.forEach((department) => {
      dep.push(department.name);
    });

    inquirer
      .prompt([
        {
          name: "newRoleName",
          type: "input",
          message: chalk.green("Enter name of new role: "),
        },
        {
          name: "newRoleSalary",
          type: "input",
          message: chalk.green("Enter the salary for the new role: "),
          validate: (value) => {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
        {
          name: "newRoleDept",
          type: "rawlist",
          message: chalk.green("Select department for the new role:"),
          choices: dep,
        },
      ])
      .then((answer) => {

        let depID;
        results.forEach((department) => {
          if (answer.newRoleDept === department.name) {
            depID = department.id;
          }
        });

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.newRoleName,
            salary: answer.newRoleSalary,
            department_id: depID,
          },
          (err) => {
            if (err) throw err;
            console.log(
              chalk.magenta.bold("\n New role was successfully created.")
            );
            start();
          }
        );
      });
  });
};
