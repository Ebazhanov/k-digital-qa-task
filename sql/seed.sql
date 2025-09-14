-- seed.sql: Sample data for the Database Query

INSERT INTO Sellers (id, name, rating, joinDate) VALUES
  (1, 'John', 4.8, '2020-01-01'),
  (2, 'Sarah', 4.9, '2019-05-10'),
  (3, 'Mike', 4.7, '2021-03-15'),
  (4, 'Anna', 4.2, '2022-07-20');

INSERT INTO Categories (id, name, description) VALUES
  (1, 'Jewelry', 'Luxury jewelry items'),
  (2, 'Fashion', 'Designer fashion items'),
  (3, 'Electronics', 'Electronic gadgets');

INSERT INTO Items (id, name, sellerId, price, categoryId, listedDate) VALUES
  (1, 'Gold Watch', 1, 999.99, 1, '2023-01-10'),
  (2, 'Silver Ring', 1, 199.99, 1, '2023-02-15'),
  (3, 'Designer Bag', 2, 799.50, 2, '2023-03-20'),
  (4, 'Camera', 3, 650.00, 3, '2023-04-25'),
  (5, 'Sunglasses', 2, 120.00, 2, '2023-05-30'),
  (6, 'Headphones', 3, 200.00, 3, '2023-06-05'),
  (7, 'Bracelet', 4, 80.00, 1, '2023-07-10');

