import pool from "../database/config.js"

// adds a product to database with args
export const addProduct = async (product_name, price, user_id) => {
    // we're taking a different approach here, since we are adding to multiple tables, we want to ensure that either everything gets added, or nothing does
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // starts transaction

        // inserts product into products table
        const productResult = await client.query(
            `INSERT INTO Products
             (product_name, price, upload_date)
             VALUES ($1, $2, NOW()) RETURNING *`, [product_name, price]
        );
        // we don't need a list here since its only one product, so we only grab the first (only element)
        const product = productResult.rows[0]

        // associates the product with the user in User_Product table
        await client.query(
            `INSERT INTO User_Product (user_id, product_id)
             VALUES ($1, $2)`, [user_id, product.product_id]
        );

        // adds the product to the Tag_Product table with no tags (tags can be added later)
        await client.query(
            `INSERT INTO Tag_Product (product_id, tag_id)
             VALUES ($1, NULL)`, [product.product_id]
        );

        await client.query('COMMIT'); // commits changes if no errors
        return product;
    } catch (err) {
        await client.query('ROLLBACK'); // rollbacks transaction in case of error
        console.error("Error adding product to the database", err);
        throw err;
    } finally {
        client.release(); // releases the client back to the pool
    }
};

// fetches products by number of products per page and page number
export const getAllProductsByPage = async (limit, page) => {
    const offset = (page - 1) * limit // calculates the offset based on the page number

    try {
        const result = await pool.query(
            'SELECT * FROM Products ORDER BY product_id LIMIT $1 OFFSET $2', [limit, offset]
        );
        return result.rows;
    } catch (err) {
        console.error("Error fetching items from the database", err)
        throw err;
    }
};

// fetches productss by tagId(s), number of products per page, and page number
export const getProductsByTagsAndPage = async (tagIds, limit, page) => {
    const offset = (page - 1) * limit;
    const tagPlaceholders = tagIds.map((_, index) => `$${index + 1}`).join(', ');
    
    try {
        const result = await pool.query(
            `SELECT DISTINCT p.* FROM Products p
             JOIN Tag_Product tp ON p.product_id = tp.product_id
             WHERE tp.tag_id IN (${tagPlaceholders})
             ORDER BY p.product_id
             LIMIT $${tagIds.length + 1} OFFSET $${tagIds.length + 2}`,
            [...tagIds, limit, offset]
        );
        return result.rows;
    } catch (err) {
        console.error("Error fetching items by tags from the database", err);
        throw err;
    }
};

// fetches products by user id
export const getProductsByUserID = async (user_id) => {
    try {
        const products = await pool.query(
            `SELECT p.* FROM Products p
             JOIN User_Product up ON p.product_id = up.product_id
             WHERE up.user_id = $1`, [user_id]
          );
          return products.rows;
    } catch (err) {
        console.error("Error fetching products by user ID from the database", err);
        throw err;
    }
  };

// fetches product and associated user info by product id
export const getProductAndUserInfoByProductID = async (prodID) => {
    try {
        const products = await pool.query(
            `SELECT products.*, up.user_id, u.first_name, u.last_name, u.email FROM products
             JOIN User_Product up ON products.product_id = up.product_id
             JOIN Users u ON up.user_id = u.user_id
             WHERE products.product_id = $1`, [prodID]
        );
        return products.rows;
    } catch (err) {
        console.error("Error fetching product and user ID by product ID from the database", err);
        throw err;
    }
};

export const getTags = async (prodID) => {
    try {
        const products = await pool.query(
            `SELECT tags.*,COUNT(tag_product.tag_id)
             FROM tag_product
             FULL JOIN tags ON tags.tag_id = tag_product.tag_id
             GROUP BY tags.tag_id ORDER BY tags.tag_id ASC`
        );
        return products.rows
    } catch {
        console.error("Error fetching tags and tag count", err);
        throw err;
    }
};