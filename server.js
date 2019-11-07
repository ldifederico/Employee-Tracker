var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "linda123",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  options();
});

function options() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update department",
      "Update role",
      "Update employee",
      "View by department",
      "View by role",
      "View by employee",
      "Remove an employee"
    ]
  }).then(function(answer) {
    switch (answer.action) {
    case "Add a department":
      addDepartment();
      break;
  
    case "Add a role":
      addRole();
      break;
  
    case "Add an employee":
      addEmployee();
      break;

    case "Update department":
      updateDepartment();
      break;
    
    case "Update role":
      updateRole();
      break;
  
    case "Update employee":
      updateEmployee();
      break;

    case "View by department":
      viewByDepartment();
      break;

    case "View by role":
      viewByRole();
      break;

    case "View by employee":
      viewByEmployee();
      break;

    case "Remove an employee":
      removeEmployee();
      break;
    }
  });
}

function addDepartment() {
  inquirer.prompt({
    name: "name",
    type: "input",
    message: "Enter name of new department"
  }).then(function(answer) {
    var query = "INSERT INTO department (name) VALUES";
    connection.query(query, { name: answer.name }, function(err, res) {
      options();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter title of new role"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter salary of new role"
    },
    {
      name: "department_id",
      type: "input",
      message: "Enter department ID for new role"
    }
  ]).then(function(answer) {
    var query = "INSERT INTO role (title, salary, department_id) VALUES";
    connection.query(query, { title: answer.title, salary: answer.salary, department_id: answer.department_id }, function(err, res) {
      options();
    });
  });
}
  
function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter first name of new employee"
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter last name of new employee"
    },
    {
      name: "role_id",
      type: "input",
      message: "Enter role of new employee"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Enter manager of new employee"
    }
  ]).then(function(answer) {
    var query = "INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES";
    connection.query(query, { firstName: answer.firstName, lastName: answer.lastName, role_id: answer.role_id, manager_id: answer.manager_id }, function(err, res) {
      options();
    });
  });
}

function updateDepartment() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Enter the ID of the department you want to update"
    },
    {
      name: "name",
      type: "input",
      message: "Confirm department name"
    }
  ]).then(function(answer) {
    var query = "UPDATE department WHERE id=?";
    var queryCont = "SET (name) VALUES ";
    connection.query(query + [answer.id] + queryCont + {name: answer.name}, function(err, res) {
      options();
    });
  });
}

function updateRole() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Enter the ID of the role you want to update"
    },
    {
      name: "title",
      type: "input",
      message: "Confirm title of role"
    },
    {
      name: "lastName",
      type: "input",
      message: "Confirm salary of role"
    },
    {
      name: "role_id",
      type: "input",
      message: "Confirm department ID of role"
    }
  ]).then(function(answer) {
    var query = "UPDATE role WHERE id=?";
    var queryCont = "SET (title, salary, department_id) VALUES ";
    connection.query(query + [answer.id] + queryCont + {title: answer.title, salary: answer.salary, department_id: answer.department_id}, function(err, res) {
      options();
    });
  });
}

function updateEmployee() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Enter the ID of the employee you want to update"
    },
    {
      name: "firstName",
      type: "input",
      message: "Confirm first name of employee"
    },
    {
      name: "lastName",
      type: "input",
      message: "Confirm last name of employee"
    },
    {
      name: "role_id",
      type: "input",
      message: "Confirm role of employee"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Confirm manager of employee"
    }
  ]).then(function(answer) {
    var query = "UPDATE employee WHERE id=?";
    var queryCont = "SET (firstName, lastName, role_id, manager_id) VALUES ";
    connection.query(query + [answer.id] + queryCont + {firstName: answer.firstName, lastName: answer.lastName, role_id: answer.role_id, manager_id: answer.manager_id}, function(err, res) {
      options();
    });
  });
}
  
function viewByDepartment() {
  connection.query("SELECT * FROM department ORDER BY id", function(err, res) {
    options();
  });
  console.table({id: answer.id}, {name: answer.name});
}

function viewByRole() {
  connection.query("SELECT * FROM role ORDER BY id", function(err, res) {
    options();
  });
  console.table({ title: answer.title}, {salary: answer.salary}, {department_id: answer.department_id });
}

function viewByEmployee() {
  connection.query("SELECT * FROM employee ORDER BY id", function(err, res) {
    options();
  });
  console.table({ firstName: answer.firstName}, {lastName: answer.lastName}, {role_id: answer.role_id}, {manager_id: answer.manager_id });
}

function removeEmployee() {
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "Enter ID of employee to be removed"
  }).then(function(answer) {
    connection.query("DELETE FROM employee WHERE id=?", { id: answer.id }, function(err, res) {
      options();
    });
  });
}
