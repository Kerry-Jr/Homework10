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
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the new title of this role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please add salary for role.' 
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Which dept id would you to add to this role?'
      }
    ]).then(function ({ title, salary, department_id }) {
      // let deptIndex = department_id.indexOf(department_id);
      connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', ${department_id})`, function (err, data) {
        if (err) throw err;
        console.table(${title});
        
        // console.log(`New role successfully added  New Title: ('${title}') New Salary: ${salary}  Added to department ${department_id}.`);
        // console.log(`...returning to main menu`)
        mainMenu();
    })
})
}


async function addEmployee() {

}
 





async function updateEmpRole() {
 
}

mainMenu();