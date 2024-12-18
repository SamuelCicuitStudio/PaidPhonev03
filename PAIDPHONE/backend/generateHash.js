const bcrypt = require('bcrypt');

// The password you want to hash
const password = 'password123';

// Generate a salt and then hash the password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    // Output the hashed password
    console.log('Hashed password:', hash);
});
