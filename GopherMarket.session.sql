-- INSERT INTO tags (tag_name)
-- VALUES
-- ('Furniture'),
-- ('Electronics'),
-- ('Transportation'),
-- ('Apparel'),
-- ('Household'),
-- ('School'),
-- ('Sports'),
-- ('Entertainment'),
-- ('Art'),
-- ('Instruments'),
-- ('Free Stuff')

SELECT tags.*,COUNT(tag_product.tag_id)
             FROM tag_product
             FULL JOIN tags ON tags.tag_id = tag_product.tag_id
             GROUP BY tags.tag_id ORDER BY tags.tag_id ASC