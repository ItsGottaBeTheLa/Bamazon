var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "cazzomadre!",
    database: "Bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection Successfull! Welcome to my Bamazon!");
    showtable();
});

function showtable() {
    connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;

        var table = new Table(
        {
            head: ["Product ID", "Product Name", "Department Name", "Price", "Items in Stock"],
            colWidths: [12, 75, 20, 12, 12]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].productname, res[i].departmentname, res[i].price, res[i].stockquantity]
            );
        }
        console.log(table);
        
    })
}