-- #3: Database Query Solution
-- Query to return top 3 most expensive items sold by sellers with rating > 4.5
-- For sellers with multiple expensive items, only include their highest-priced item
-- Results ordered by item price in descending order

WITH HighRatedSellers AS (
    -- Get sellers with rating greater than 4.5
    SELECT id, name, rating
    FROM Sellers
    WHERE rating > 4.5
),
SellerItemCounts AS (
    -- Count total items listed by each seller
    SELECT sellerId, COUNT(*) as TotalItemsListed
    FROM Items
    GROUP BY sellerId
),
MaxPricePerSeller AS (
    -- Get the highest-priced item for each high-rated seller
    SELECT
        i.sellerId,
        MAX(i.price) as MaxPrice
    FROM Items i
    INNER JOIN HighRatedSellers hrs ON i.sellerId = hrs.id
    GROUP BY i.sellerId
),
TopItems AS (
    -- Get the actual item details for the highest-priced items
    SELECT
        i.id,
        i.name as ItemName,
        i.price as ItemPrice,
        i.sellerId,
        i.categoryId
    FROM Items i
    INNER JOIN MaxPricePerSeller mps ON i.sellerId = mps.sellerId AND i.price = mps.MaxPrice
)
-- Final query with all required information
SELECT
    ti.ItemName,
    ti.ItemPrice,
    hrs.name as SellerName,
    hrs.rating as SellerRating,
    sic.TotalItemsListed,
    c.name as CategoryName
FROM TopItems ti
INNER JOIN HighRatedSellers hrs ON ti.sellerId = hrs.id
INNER JOIN SellerItemCounts sic ON ti.sellerId = sic.sellerId
INNER JOIN Categories c ON ti.categoryId = c.id
ORDER BY ti.ItemPrice DESC
LIMIT 3;

-- Expected Output:
-- ItemName     | ItemPrice | SellerName | SellerRating | TotalItemsListed | CategoryName
-- -------------|-----------|------------|--------------|------------------|-------------
-- Diamond Ring | 1500.00   | John       | 4.8          | 3                | Jewelry
-- Laptop       | 1200.00   | Mike       | 4.7          | 2                | Electronics
-- Designer Bag | 799.50    | Sarah      | 4.9          | 3                | Fashion
