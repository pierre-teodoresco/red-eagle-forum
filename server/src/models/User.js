// models/User.js
import mongoose from 'mongoose';

const User = mongoose.model('User', {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    surname: {
        type: String,
        required: false,
        trim: true
    },
});

export default {
    /**
     * @brief Insert a new user into db
     * @param {JSON} user 
     */
    insert: async (user) => {
        const newUser = new User({
            username: user.username,
            email: user.email,
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
    },
    /**
     * @brief Update user fields
     * @param {string} username - Username of the user to update
     * @param {object} updatedFields - Object containing the fields to update
     * @returns {object} - Updated user object
     */
    update: async (username, updatedFields) => {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('User not found');
        }

        // Update fields
        Object.assign(user, updatedFields);

        // Save the updated user
        await user.save();

        return user.toObject();
    },
};