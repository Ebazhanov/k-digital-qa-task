-- Inserting test data into Sellers, Categories, and Items tables

-- Insert Categories
INSERT INTO Categories (id, name, description) VALUES
(1, 'Jewelry', 'Luxury jewelry and accessories'),
(2, 'Fashion', 'Designer clothing and accessories'),
(3, 'Electronics', 'Latest electronic gadgets and devices'),
(4, 'Home', 'Home decoration and furniture'),
(5, 'Sports', 'Sports equipment and accessories');

-- Insert Sellers with various ratings
INSERT INTO Sellers (id, name, rating, joinDate) VALUES
(1, 'John', 4.8, '2023-01-15'),
(2, 'Sarah', 4.9, '2023-02-20'),
(3, 'Mike', 4.7, '2023-03-10'),
(4, 'Emma', 4.6, '2023-04-05'),
(5, 'David', 4.2, '2023-05-12'),
(6, 'Lisa', 4.5, '2023-06-18'),
(7, 'Alex', 4.4, '2023-07-22');

-- Insert Items with various prices
INSERT INTO Items (id, name, sellerId, price, categoryId, listedDate) VALUES
-- John's items (rating 4.8)
(1, 'Gold Watch', 1, 999.99, 1, '2023-08-01'),
(2, 'Silver Necklace', 1, 299.50, 1, '2023-08-05'),
(3, 'Diamond Ring', 1, 1500.00, 1, '2023-08-10'),

-- Sarah's items (rating 4.9)
(4, 'Designer Bag', 2, 799.50, 2, '2023-08-02'),
(5, 'Leather Jacket', 2, 450.00, 2, '2023-08-06'),
(6, 'Silk Scarf', 2, 120.00, 2, '2023-08-11'),

-- Mike's items (rating 4.7)
(7, 'Camera', 3, 650.00, 3, '2023-08-03'),
(8, 'Laptop', 3, 1200.00, 3, '2023-08-07'),

-- Emma's items (rating 4.6)
(9, 'Gaming Console', 4, 500.00, 3, '2023-08-04'),
(10, 'Headphones', 4, 200.00, 3, '2023-08-08'),
(11, 'Tablet', 4, 350.00, 3, '2023-08-12'),

-- David's items (rating 4.2 - below 4.5)
(12, 'Expensive Vase', 5, 2000.00, 4, '2023-08-09'),

-- Lisa's items (rating 4.5 - exactly 4.5)
(13, 'Antique Clock', 6, 800.00, 4, '2023-08-13'),

-- Alex's items (rating 4.4 - below 4.5)
(14, 'Sports Equipment', 7, 300.00, 5, '2023-08-14');
