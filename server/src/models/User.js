// User.js
import mongoose from 'mongoose';

const User = mongoose.model('User', {
    username: String,
    password: String,
});

const UserModel = {
    /**
     * @brief Insert a new user into db
     * @param {string} username 
     * @param {string} password 
     */
    insert: async (username, password) => {
        const newUser = new User({
            username,
            password,
        });
    
        await newUser.save();
    },
    /**
     * @brief get user by username
     * @param {string} username 
     * @returns {string || null} depending on whether the user is found or not
     */
    getByUsername: async (username) => {
        return await User.findOne({ username });
    }
};

export default UserModel;