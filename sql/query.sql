-- query.sql: SQL query for the Database Query

-- Returns the top 3 most expensive items sold by sellers with a rating > 4.5.
-- For sellers with multiple expensive items, only the highest-priced item is included.
-- Includes seller's name, rating, total items listed, and category name.

SELECT
  i.name AS ItemName,
  i.price AS ItemPrice,
  s.name AS SellerName,
  s.rating AS SellerRating,
  (SELECT COUNT(*) FROM Items WHERE sellerId = s.id) AS TotalItemsListed,
  c.name AS CategoryName
FROM Items i
JOIN Sellers s ON i.sellerId = s.id
JOIN Categories c ON i.categoryId = c.id
WHERE s.rating > 4.5
  AND i.id IN (
    SELECT id FROM (
      SELECT id,
             ROW_NUMBER() OVER (PARTITION BY sellerId ORDER BY price DESC) AS rn
      FROM Items
    ) t
    WHERE rn = 1
  )
ORDER BY i.price DESC
LIMIT 3;

