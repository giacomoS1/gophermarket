import pool from "../database/config.js"

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

export const getProductsByUserID = async (user_id) => { // fetches products by user id
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