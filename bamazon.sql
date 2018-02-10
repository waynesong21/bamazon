-- Creates the "amazon_db" database --
CREATE DATABASE bamazon_db;
-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Electronics", 50.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 7.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cup", "Home", 3.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table", "Home", 200.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone Case", "accessories", 5.00, 230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle", "Electronics", 100.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 60.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens", "School/Office", 2.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 150.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamins", "Health", 45.00, 120);