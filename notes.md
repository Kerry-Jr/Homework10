Inquirer prompt with the 7 options 
Main menu - 

-Add departments, roles, employees

-View departments, roles, employees

-Update employee roles

Exit option


Create sql schema and  DB. 
--finished--

1.View department, roles, employee tables
  call sql table departments and display to user with console.table.
    -then call mainmenu()

2.Add departments
    Prompt user - name new department
    SQL - insert to departments name
        display success message
        call mainmenu()
  
3. Add roles
      query DB to get all department IDs => rendered as choices for department ID prompt question. render those items from db. 
      Prompt user - add role - title, salary, and dept ID. 1 inquire prompt with 3 questions. 
        INSERT INTO roles 
          display success message
            call mainmenu()

4. Add employees 
  query db to get roles, and employees table.
  Prompt user to add employee - first, last name, role_id, manager_id.
      role id comes from roles table, manager-id comes from employees table,
      names user inputs
              INSERT INTO employees 
              display success message
              call mainmenu()

5.Update employees roles
query db to get roles table, employee table.
Prompt user to update information about employee.
    inquirer - Who would you like to update?
    choices coming from the employee table
    question - would you like to change a role?
        choices come from roles table so they can pick which role to change to.
                UPDATE employees roles 
              display success message
              call mainmenu()




//didn't work, getting console logs but breaks after that 5pm sunday
//(async answers => {
      console.log(answers);
      console.log(answers.title);
      console.log(answers.salary);
      console.log(answers.department_id);
      let userTitle = answers.title;
      let userSalary = answers.salary;
      let userDepartment = answers.department_id;
      const query = connection.query('INSERT INTO roles SET ?',
      {
        title: userTitle,
        salary: userSalary,
        department_id: userDepartment
      },
      function(err,res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
      });
      try { 
      } catch (e) {
        mainMenu();
      }