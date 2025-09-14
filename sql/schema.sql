-- schema.sql: Table definitions for the Database

CREATE TABLE Sellers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  rating DECIMAL(2,1),
  joinDate DATE
);

CREATE TABLE Categories (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT
);

CREATE TABLE Items (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  sellerId INT,
  price DECIMAL(10,2),
  categoryId INT,
  listedDate DATE,
  FOREIGN KEY (sellerId) REFERENCES Sellers(id),
  FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

