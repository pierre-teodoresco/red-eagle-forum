// User.js
import mongoose from 'mongoose';

const User = mongoose.model('User', {
    username: String,
    password: String,
});

/**
 * @brief Register a new user
 * @param {string} username 
 * @param {string} password 
 */
async function register(username, password) {
    const newUser = new User({
        username,
        password,
    });

    await newUser.save();
}

/**
 * @brief Log in a user
 * @param {string} username 
 * @param {string} password 
 * @returns {string || null} if found the logged user
 */
async function login(username) {
    const user = await User.findOne({ username });
    if (user) {
        // User found, return user data
        return user;
    } else {
        // User not found or password doesn't match
        return null;
    }
}

export { User, register, login };
