var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "waynes1234",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    //State the functions that need to run once the connection has been successfully made.
    queryAllProducts();
});

function queryAllProducts() {
    console.log("Showing all the products on Bamazon.com...\n");
    connection.query(
        "SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            };
            console.log("----------------------------------------------");
            itemSearch();
        }
    );
}
// Prompts two questions
function itemSearch(){
    inquirer
        //First, asks customers the ID of the product they would like to buy
        .prompt({
            name: "id",
            type: "input",
            message: "What is the id of the item you want to buy?"
        })
        // .then methods searches for the corresponding item and displays in terminal
        .then(function(answer) {
            console.log(answer.id);
            connection.query("SELECT * FROM products WHERE id=?", [answer.id], function(err, res) {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(res);
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "ID: " +
                        res[i].id +
                        " || Product Name:" +
                        res[i].product_name +
                        " || Price: " +
                        res[i].price +
                        " || Stock Remaining: " +
                        res[i].stock_quantity
                    );
                }

                queryQuantity(res[0].id)
            // Call the next function within this call back function
            });
        });
}

function queryQuantity(id) {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function(answer) {
            var query = answer.quantity;
            connection.query("SELECT stock_quantity FROM products WHERE id=?", [id], function(err, res) {
                if (err) {
                    console.log(err);
                    return err;
                }

                var stock = res[0].stock_quantity;

                // compare query with stock
                if (stock >= query){
                    console.log("There are this many in stock", res[0].stock_quantity);
                }

                else {
                    console.log("Insufficient quantity!");
                }
                connection.end();
            })
        })
}