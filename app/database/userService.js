import pool from "../database/config.js";

// fetches a user from the database by their email
export const findUserByEmail = async (email) => {
  const userField = await pool.query(
    'SELECT * FROM users WHERE email = $1', [email] // grabs row where the users email exists (if it does at all)
  );
  return userField.rows[0];
};

// adds a user to the database with args
export const createUser = async (email, firstName, lastName) => {
  const newUser = await pool.query(
    'INSERT INTO users (email, first_name, last_name) VALUES ($1, $2, $3) RETURNING *', [email, firstName, lastName] // inserts new user info
  );
  return newUser.rows[0];
};