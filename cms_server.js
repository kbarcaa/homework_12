const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rlatjdwls",
  database: "cms_db"
})

connection.connect((err)=>{
  if (err) throw err;
  start();
})

start = () =>{
  inquirer.prompt([
    {
      name: "mainQuestion",
      type: "list",
      choices: ["View all employees"],
      message: "Please choose one: "
    }
  ]).then((res)=>{
    if (res.mainQuestion === "View all employees"){
      showAllEmployees();
    }
  })
}

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
    })
}