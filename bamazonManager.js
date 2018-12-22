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
    console.log("Connection Successfull! Welcome to my Bamazon-Manager!");
    console.log("---------------------------------------------");
    initiatePro();
});

function initiatePro(){
    inquirer.prompt([{
        type: "list",
        name: "access",
        message: "Please choose from the following options:",
        choices: ["View Products for Sale", "View Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function(ans){
        switch(ans.access){
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log('Thank you for logging in, Goodbye!')
        }
    });
}

function viewProducts(){
    console.log('Now Viewing Products For Sale');

    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;
        console.log("---------------------------------------------")
        
        for (var i =0; i < res.length; i++){
            console.log("ID: " + res[i].itemID + " " + "Product Name: " + res[i].productname + " " + "Department: " + res[i].departmentname + " " + "Price: " +res[i].price + " " + "Items in Stock: " + res[i].stockquantity);
            console.log("------------------------------------------------------------------------------------------");
        }

        initiatePro();

    });
}

function viewLowInventory(){
    console.log('Now Viewing Low Inventory List');

    connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        console.log("---------------------------------------------")

        for(var i = 0; i < res.length; i++){
            if(res[i].stockquantity <= 5){
                console.log("ID: " + res[i].itemID + " " + "Product Name: " + res[i].productname + " " + "Department: " + res[i].departmentname + " " + "Price: " +res[i].price + " " + "Items in Stock: " + res[i].stockquantity);
                console.log("------------------------------------------------------------------------------------------");   
            }
        }

        initiatePro();
    });
}

function addToInventory(){
    console.log('You now have the ability to add to the inventory');

    connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;
        var itemArray = [];

        for (var i = 0 ; i ,res.length; i++){
            itemArray.push(res[i].productname);
        }

        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemArray,
            message: "Which Item are we adding inventory too?"
        },{
            type: "input",
            name: "qty",
            message: "How many more should we add?",
            validate: function(value){
                if(isNaN(value) === false){return true;}
                else {return false;}
            

        }
        }]).then(function(ans){
            var currentQty;
            for(var i = 0; i < res.length; i++){
                if(res[i].productname === ans.product){
                    currentQty = res[i].stockquantity;
                }
            }

            connection.query('UPDATE products SET ? WHERE ?',[
                {stockquantity: currentQty + parseInt(ans.qty)},
                {productname: ans.product}
            ], function(err, res){
                if(err) throw err;
                console.log('This Items stock has been successfully updated!');
                initiatePro();
            });
        })
    });
}

function addNewProduct(){
    console.log("You now have the ability to add a new product");
    var deptName = [];

    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            deptName.push(res[i].departmentname);
        }
    })

    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please Select Product by ID Number:",
        validate: function(value){
            if(value){return true;}
            else{return false;}
        }
    },{
       type: "input",
       name: "price",
       message: "Price: ",
       validate: function(value){
           if(isNaN(value) === false){return true;}
           else{return false;}
       }
    },{
        type: "input",
        name: "quantity",
        message: "Quantity",
        validate:function(value){
            if(isNaN(value) == false){return true;}
            else{return false;}
        }
    
    }]).then(function(ans){
        connection.query('INSERT INTO products SET ?',{
            productname: ans.product,
            departmentname: ans.department,
            price: ans.price,
            stockquantity: ans.quantity
        },function(err, res){
            if(err) throw err;
            console.log('Another items has been added to the store!');
        })
        initiatePro();
    });
}


