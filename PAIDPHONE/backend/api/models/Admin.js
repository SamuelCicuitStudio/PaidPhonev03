const bcrypt = require('bcrypt');
const db = require('../../config/db');

const findByUsername = async (username) => {
    const query = 'SELECT * FROM admins WHERE username = ?';
    const [rows] = await db.promise().query(query, [username]);
    return rows[0];
};

// Check password using bcrypt
const checkPassword = async (storedPassword, inputPassword) => {
    try {
        return await bcrypt.compare(inputPassword, storedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

module.exports = { findByUsername, checkPassword };
