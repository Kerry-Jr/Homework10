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
    const [departments] = await connection.query(query);
    console.table("\x1b[31m", departments);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
};

async function viewRoles() {
  try {
    const query = 'SELECT * FROM roles';
    const [roles] = await connection.query(query);
    console.table("\x1b[32m", roles);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
}

async function viewEmployees() {
  try {
    const query = 'SELECT * FROM employees';
    const [employees] = await connection.query(query);
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
        viewDepartments();
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
    ]).then(function (answers) {
      // let deptIndex = department_id.indexOf(department_id);
      console.log(answers.title);
      console.log(answers.salary);
      console.log(answers.department_id)
      connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${answers.department_id})`, function (err, data) {
        if (err) throw err;
        viewRoles();
        mainMenu();
      })
    })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name? of the new employee?"
      },
      {
        type: "number",
        name: "role_id",
        message: "What is the new employees role?"

      },
      {
        type: "number",
        name: "manager_id",
        message: "Who is their manager?"
      }
    ])
    .then(function (answers) {
       
      connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`),
      viewEmployees();
      mainMenu();
    })
}

async function updateEmpRole() {
  connection.query("SELECT first_name, last_name, id FROM employees",
    function (err, res) {
      if (err) throw err;
      let employees = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employees",
            message: "Which employee's role would you like to update?",
            choices: employees
          },
          {
            type: "input",
            name: "role",
            message: "What is your new role?"
          }
        ])
        .then(function (answers) {
          connection.query(`UPDATE employees SET role_id = '${answers.role}' WHERE id = '${answers.employees}'`,

            function (err, res) {
              if (err) throw err;
              viewEmployees();
              console.log(`Employee's role has been updated successfully. Thank You`);
              mainMenu();
            }
          );
        })
    }
  )
}

mainMenu();