const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db',
}).promise();

function mainMenu() {
  inquirer.prompt({
    type: "list",
    name: "userChoice",
    message: "Select an option",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "Exit"
    ]
  }).then(answers => {
    switch (answers.userChoice) {
      case "View Departments":
        viewDepartments();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "View Employees":
        viewEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmpRole();
        break;
      case "Exit":
      connection.end();  
      return;
      default:
      return;
    }
  })
}


async function viewDepartments() {
  try {
    const query = 'SELECT * FROM departments';
    const [ departments ] = await connection.query(query);
    console.table("\x1b[31m",departments);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
};

async function viewRoles() {
  try {
    const query = 'SELECT * FROM roles';
    const [ roles ] = await connection.query(query);
    console.table("\x1b[32m", roles);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
}

async function viewEmployees() {
  try {
    const query = 'SELECT * FROM employees';
    const [ employees ] = await connection.query(query);
    console.table("\x1b[33m", employees);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
}
function addDepartment() {
  inquirer
      .prompt(
          {
              name: 'deptTitle',
              message: "What is the department's name?",
              type: 'input'
          }
      ).then(function ({ deptTitle }) {
          connection.query(`INSERT INTO departments (deptTitle) VALUES ('${deptTitle}')`, function (err, data) {
              if (err) throw err;
              console.log(`NEW DEPARTMENT HAS BEEN SUCCESSFULLY ADDED`)
              mainMenu();
          }) 
          try {
          } catch (e) {
              console.log(e)
          }
      })
}

function addRole() {

}

async function addEmployee() {
 
}
async function updateEmpRole() {
 
}

mainMenu();