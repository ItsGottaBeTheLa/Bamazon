drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
	itemid integer auto_increment not null,
    productname varchar(45) not null,
    departmentname varchar(45) not null,
    price decimal(10, 2) not null,
    stockquantity integer (10) not null,
    primary key (itemid)
);

insert into products(productname, departmentname, price, stockquantity)
values("Red Dead Redemeption 2", "Video Game", 59.99, 100),
	("Fifa 19", "Video Game", 59.99, 100),
    ("Cowboy Hat", "Apparel", 35.00, 50),
    ("Denim Jeans", "Apparel", 79.00, 70),
    ("I Think Therefore I Play", "Book", 14.90, 35),
    ("Commitment", "Book", 10.19, 20),
    ("Miracle", "Movie", 12.84, 15),
    ("Batman Begins", "Movie", 7.17, 5),
    ("Monopoly", "Board Game", 32.83, 10),
    ("Chess", "Board Game", 15.45, 10);
    
    

select*from products;