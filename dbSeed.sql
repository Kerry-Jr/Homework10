USE employee_db;

INSERT INTO departments (deptName)
VALUES ("Accounting"),
        ("Engineering"),
        ("Marketing"),
        ("Executive");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Accountant", 75000.00, 1),
        ("Developer", 130000.00, 2),
        ("Designer", 100000.00, 3),
        ("President", 400000.00, 4);

INSERT INTO  employees (first_name, last_name, role_id, manager_id)
VALUES ("Kerry","Smith",2, null),
       ("Musa","Akbari",2, null),
       ("Barack","Obama",4, null),
       ("Joe","Biden", 3, 3);
      
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

