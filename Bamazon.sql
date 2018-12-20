drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
	itemID integer auto_increment not null,
    productname varchar(45) not null,
    departmentname varchar(45) not null,
    price decimal(10, 2) not null,
    stockquantity integer (10) not null,
    primary key (itemID)
);

insert into products(productname, departmentname, price, stockquantity)
values("Red Dead Redemeption 2", "Entertainment", 59.99, 100),
	("Fifa 19", "Entertainment", 59.99, 100),
    ("Cowboy Hat", "Apparel", 35.00, 50),
    ("Denim Jeans", "Apparel", 79.00, 70),
    ("Tents", "Sports & Outdoors", 14.90, 35),
    ("Cheez-It", "Snack", 10.19, 20),
    ("Miracle", "Entertainment", 12.84, 15),
    ("Batman Begins", "Entertainment", 7.17, 5),
    ("Monopoly", "Entertainment", 32.83, 10),
    ("Chess", "Entertainment", 15.45, 10);
    

create table departments(
	departmentID mediumint auto_increment not null,
    departmentName varchar(50) not null,
    overHeadCost decimal(10, 2) not null,
    totalSales decimal(10, 2) not null,
    primary key(departmentID)
);

insert into departments(departmentName, overHeadCost, totalSales)
values ('Entertainment', 35000.00, 10000.00),
	('Tools & Hardware', 55000.00, 15000.00),
    ('Home Goods', 20000.00, 8000.00),
    ('Snacks', 40000.00, 18000.00),
    ('Apparel', 25000.00, 17000.00),
    ('Sports & Outdoors', 33000.00, 23000.00),
    ('Kids', 75000.00, 45000.00);

    
    

select*from departments