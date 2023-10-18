// User.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
    insert: async (user) => {
        const newUser = new User({
            username: user.username,
            password: user.password,
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