var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "cazzomadre!",
    database: "Bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection Successfull! Welcome to my Bamazon-Supervisor!");
    console.log("---------------------------------------------");
    initiatePro();
});

function initiatePro(){
    inquirer.prompt([{
        type: "list",
        name: "access",
        message: "Please select an option from below:",
        choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function(ans){
        switch(ans.access){
            case "View Products Sales by Department": viewProductByDept();
            break;
            case "Create New Department": createNewDept();
            break;
            case "End Session": console.log("Your Session Has Ended, Goodbye!");
        }
    });
}