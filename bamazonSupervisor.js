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

function viewProductByDept(){

    connection.query('SELECT * FROM departments', function(err, res){
        if(err) throw err;
        console.log("Product Sales by Department");
        console.log("---------------------------------------------");

        for(var i = 0; i <res.length; i++){
            console.log("ID: " + res[i].departmentID + " " + "DepartmentName: " + res[i].departmentName + " " + "Over Head Costs: " + (res[i].overHeadCost).toFixed(2) + " " + "Product Sales " + (res[i].totalSales).toFixed(2) + " " + "Total Profit: " +(res[i].totalSales - res[i].overHeadCost).toFixed(2));
            console.log("------------------------------------------------------------------------------------------");
        }
        initiatePro();
    })
}

function createNewDept(){
    console.log("You Now Have The Ability To Create A New Department!");

    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "Department Name: "
        },{
            type: "input",
            name: "overHeadCost",
            message: "Over Head Cost: ",
            default: 0,
            validate:function(val){
                if(isNaN(val) === false){return true;}
                else{return false;}
            }
        },{
            type: "input",
            name: "prodSales",
            message: "Product Sales: ",
            default: 0,
            validate:function(val){
                if(isNaN(val) === false){return true;}
                else{return false;}
            }
        }
    ]).then(function(ans){
        connection.query('INSERT INTO departments SET ?', {
            departmentName: ans.deptName,
            overHeadCost: ans.overHeadCost,
            totalSales: ans.prodSales
        }, function (err, res){
            if(err) throw err;
            console.log("Success! Another Department has been added!")
        })
        initiatePro();
    })
}