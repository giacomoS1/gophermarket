-- Creates a table of all the products
CREATE TABLE Products(
	product_id serial PRIMARY KEY,
	product_name int,
	price numeric,
	upload_date date
);
-- Creates a table of all the Tags/Categories
CREATE TABLE Tags(
	tag_id serial PRIMARY KEY,
	tag_name varchar(255)
	
);
-- Creates a many-to-many relation between Tags and Products
CREATE TABLE Tag_Product(
	product_id INT REFERENCES Products(product_id),
	tag_id int REFERENCES Tags(tag_id)
);
-- Creates table of all allowed meetup locations
CREATE TABLE Location(
	loc_id serial PRIMARY KEY,
	loc_name VARCHAR(255)
);
-- Creates a table of User/their info
CREATE TABLE Users(
	user_id serial PRIMARY KEY,
	email VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
-- 	one to many relationship between users and locations used to link preferred locations for exchange.
	pref_loc int REFERENCES Location(loc_id)
);
-- Creates many-to-many relation between Users Products
CREATE TABLE User_Product(
	user_id INT REFERENCES Users(user_id),
	product_id INT REFERENCES Products(product_id)
);


