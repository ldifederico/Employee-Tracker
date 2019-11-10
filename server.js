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
  }).then(function({name}) {
    var query = "INSERT INTO department (name) VALUES (?)";
    connection.query(query, name, function(err, res) {
      if (err) throw (err);
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
  ]).then(function(res) {
    var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    var role = [res.title, res.salary, res.department_id];
    connection.query(query, role, function(err, res) {
      if (err) throw (err);
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
      message: "Enter role ID of new employee"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Enter manager ID of new employee"
    }
  ]).then(function(res) {
    var query = "INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES (?, ?, ?, ?)";
    var employee = [res.firstName, res.lastName, res.role_id, res.manager_id]
    connection.query(query,  employee, function(err, res) {
      if (err) throw (err);
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
  ]).then(function(res) {
    var query = "UPDATE department SET name=? WHERE id=?";
    connection.query(query, [res.name, res.id], function(err, res) {
      if (err) throw (err);
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
      name: "salary",
      type: "input",
      message: "Confirm salary of role"
    },
    {
      name: "department_id",
      type: "input",
      message: "Confirm department ID of role"
    }
  ]).then(function(res) {
    var query = "UPDATE role SET title=?, salary=?, department_id=? WHERE id=?";
    var roleEdit = [res.title, res.salary, res.department_id, res.id];
    connection.query(query, roleEdit, function(err, res) {
      if (err) throw (err);
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
      message: "Confirm role ID of employee"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Confirm manager ID of employee"
    }
  ]).then(function(res) {
    var query = "UPDATE employee SET firstName=?, lastName=?, role_id=?, manager_id=? WHERE id=?";
    var employeeEdit = [res.firstName, res.lastName, res.role_id, res.manager_id, res.id];
    connection.query(query, employeeEdit, function(err, res) {
      if (err) throw (err);
      options();
    });
  });
}
  
function viewByDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw (err);
    console.table(res);
    options();
  });
}

function viewByRole() {
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw (err);
    console.table(res);
    options();
  });
}

function viewByEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw (err);
    console.table(res);
    options();
  });
}

function removeEmployee() {
  inquirer.prompt({
    name: "id",
    type: "input",
    message: "Enter ID of employee to be removed"
  }).then(function({id}) {
    var query = "DELETE FROM employee WHERE id=?";
    connection.query(query, id, function(err, res) {
      if (err) throw (err);
      options();
    });
  });
}
