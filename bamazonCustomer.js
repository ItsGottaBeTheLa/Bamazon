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
    console.log("Connection Successfull! Welcome to my Bamazon!");
    console.log("---------------------------------------------");
    initiateSale();
});

function initiateSale(){
    connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;

        for(var i = 0; i <res.length; i++){
            console.log("ID: " + res[i].itemID + " " + "Product Name: " + res[i].productname + " " + "Department: " + res[i].departmentname + " " + "Price: " +res[i].price + " " + "Items in Stock: " + res[i].stockquantity);
            console.log("------------------------------------------------------------------------------------------");
        }

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to buy?",
                validate: function(value){
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                    } else{
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of this item would you like to buy?",
                validate: function(value){
                    if(isNaN(value)){
                        return false;
                    } else{
                        return true;
                    }
                }
            }
        ]).then(function(cart){
            var purchased = (cart.id)-1;
            var itemsToBuy = parseInt(cart.quantity);
            var grandTotal = parseFloat(((res[purchased].price)*itemsToBuy).toFixed(2));

            if(res[purchased].stockquantity >= itemsToBuy) {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {stockquantity: (res[purchased].stockquantity - itemsToBuy)},
                    {itemID: cart.id}
                ], function(err, result){
                    if(err) throw err;
                    console.log("Nice buy! Your total is $ "+ grandTotal.toFixed(2) + " "  + "PLEASE ALLOW UP TO 5 DAYS SHIPPING!");
                });
            }
        })
    })
}