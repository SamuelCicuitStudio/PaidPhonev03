-- Create the 'paidphone' database if it does not already exist
CREATE DATABASE IF NOT EXISTS paidphone;

-- Create the 'admins' table to store administrator credentials
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each admin
    username VARCHAR(255) UNIQUE NOT NULL,      -- Username for login, must be unique
    password VARCHAR(255) NOT NULL,             -- Hashed password for authentication
    last_login DATETIME DEFAULT NULL,           -- Last login date and time (NULL if never logged in)
    role ENUM('admin', 'user', 'moderator') DEFAULT 'user'  -- User role: admin, user, or moderator (default is user)
);

-- Insert the hashed password into the admins table
INSERT INTO admins (username, password) VALUES
('admin', '$2b$10$J9A8hj7VJhVsMLoHdkx4aeZXwrOoTG9N75p7m6.QzQRG7Y8qL.QYf','NULL','admin');
-- Select the 'paidphone' database for further operations
USE paidphone;

-- Create the 'point_of_sale' table to store point of sale information
CREATE TABLE point_of_sale (
    pos_id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique point of sale identifier
    pos_name VARCHAR(255) NOT NULL,              -- Name of the point of sale location
    manager_name VARCHAR(255) NOT NULL,          -- Name of the manager overseeing the point of sale
    manager_phone VARCHAR(15) NOT NULL,          -- Contact phone number of the manager
    current_balance DECIMAL(10, 2) DEFAULT 0.00, -- Current balance in the sales module (default: 0.00)
    master_card_id INT,                          -- Associated master card ID (nullable)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of record creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of last update
);

-- Additional tables can be added as necessary, for example, the 'master_cards' table:
-- CREATE TABLE master_cards (
--     card_id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique master card identifier
--     card_number VARCHAR(255) NOT NULL,              -- Master card number
--     expiration_date DATE NOT NULL                   -- Expiration date of the master card
-- );
