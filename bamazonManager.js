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
    runOptions();
});

function runOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Select an option.",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    queryAllProducts();
                    break;

                case "View Low Inventory":
                    queryLowInventory();
                    break;

                case "Add to Inventory":
                    restock();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}

function queryAllProducts() {
    console.log("----------------------------------------------");
    console.log("Showing all the products on Bamazon.com...\n");
    connection.query(
        "SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            };
            console.log("----------------------------------------------");
            // Call the next function.
            runOptions();
        }
    );
}

function queryLowInventory() {
    console.log("----------------------------------------------");
    console.log("Showing all the products with low inventory...");
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
            if (err) {
                console.log(err);
                return err;
            }
            if (res.length > 0) {
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
            }

            else {
                console.log("No product with low inventory was found.");
            }
            console.log("----------------------------------------------");
            runOptions();
        }
    );
}

function restock() {
    console.log("----------------------------------------------");
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the item you would like to restock?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                name: "quantity",
                type: "input",
                message:"How many would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ])
        .then(function(answer){

            var productId = answer.id;
            var addQuantity = answer.quantity;

            var updateQueryId = "UPDATE products SET stock_quantity = stock_quantity + " + (addQuantity) + " WHERE id = " + productId;
            console.log(updateQueryId);
            connection.query(updateQueryId, function(err, res) {
                if (err) {
                    throw err;
                }
                // console.log("Stock count for Item ID " + productId + "has been updated to " + (productId.stock_quantity + addQuantity) + ".");
                console.log("----------------------------------------------");
                runOptions();
            });
                    // }
                    // console.log("Stock has been updated!");
                    // console.log(res[0].stock_quantity);

        });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Input Id number for the new product."
            },
            {
                name: "name",
                type: "input",
                message: "What is the name of this product?"
            },
            {
                name: "department",
                type: "input",
                message: "What department?"
            },
            {
                name: "price",
                type: "input",
                message: "Set the price."
            },
            {
                name: "quantity",
                type: "input",
                message: "Specify the quantity."
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    id: answer.id,
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function(err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("New product has been successfully added.")
                    }
                }
            );
        });
}