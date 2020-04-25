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
    console.table('\x1b[33m', '\x1b[41m',departments);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
};

async function viewRoles() {
  try {
    const query = 'SELECT * FROM roles';
    const [ roles ] = await connection.query(query);
    console.table(roles);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
}

async function viewEmployees() {
  try {
    const query = 'SELECT * FROM employees';
    const [ employees ] = await connection.query(query);
    console.table(employees);
    mainMenu();
  } catch (error) {
    console.log(error)
  }
}
async function addDepartment() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "deptName", 
      message: "What Department would you like to add?"
    }
  ])
  .then(function(res){
    console.log(res);
    const query = connection.query(
      "INSERT INTO departments SET ?", 
      {
        name: res.deptName
      }, 
      function(err, res){
        connection.query("SELECT * FROM departments", function(err, res){
          console.table(res); 
          mainMenu(); 
        })
      }
    )
  })
}

function addRole() {
  let departments= []; 
  connection.query("SELECT * FROM departments",
  function(err,res){
    if(err) throw err;
    for (let i=0; i <res.length; i++){
      res[i].first_name + " " + res[i].last_name
      departments.push({name: res[i].name, value: res[i].id});
    }
  inquirer
  .prompt([
    {
      type: "input", 
      name: "title",
      message: "What role would you like to add?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the role?"
    },
    {
      type: "list",
      name: "department",
      message: "what department?",
      choices: departments
    }
  ])
  .then (function(res){
    console.log(res); 
    const query = connection.query(
      "INSERT INTO roles SET ?",
      {
        title: res.title,
        salary: res.salary,
        department_id: res.department
      }, 
      function (err, res){
        if (err) throw err;
        //const id = res.insertId;
        mainMenu(); 
      }
    )
  })
  })
}
function addEmployee() {
  inquirer 
  .prompt ([ 
    {
      type: "input", 
      message: "First Name?",
      name: "first_name",
    },
    {
      type: "input", 
      message: "Last Name?",
      name: "last_name"
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role_id", 
      choices: [1,2,3]
    },
    {
      type: "input", 
      message: "Who is their manager?",
      name: "manager_id"
    }
  ])
  .then (function(res){
    const query = connection.query(
      "INSERT INTO employees SET ?", 
     res,
      function(err, res) {
        if (err) throw err;
        console.table( "The new employee was added!\n");

        mainMenu(); 
      }
    );    
  })
}
function updateEmpRole() {

}
mainMenu();




