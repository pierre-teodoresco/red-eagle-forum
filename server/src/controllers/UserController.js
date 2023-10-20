// UserController.js

import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import Service from '../services/service.js';

const userController = {
    /**
     * @brief register a new user
     */
    register: async (req, res) => {
        try {
            const hashedPassword = await Service.hashPassword(req.body.password);
            const user = {
                username: req.body.username,
                password: hashedPassword,
            };
            await User.insert(user);
            res.status(200).json({ message: 'User added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * @brief log in the user by creating a session
     */
    login: async (req, res) => {
        try {
            // Get user from database
            const user = await User.getByUsername(req.body.username);
            console.log(user);

            // Check if user exists and password is correct
            if (!user || !(await Service.comparePassword(user.password, req.body.password))) {
                // Wrong username or password
                res.status(401).json({ error: 'Invalid credentials' });
            } else {
                // User found and password correct
                req.session.user = { ...user.toObject() };
                delete req.session.user.password;
                res.status(200).json({ message: 'Logged in successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * @brief logout the user by destroying the session
     */
    logout: (req, res) => {
        // Destroy the session to log the user out
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error logging out' });
            } else {
                res.status(200).json({ message: 'Logged out successfully' });
            }
        });
    },
    /**
     * @brief check if the user is logged in
     */
    checkLogin: (req, res) => {
        // Check the session to see if the user is logged in
        if (req.session.user) {
            console.log(req.session.user);
            res.status(200).json({ message: 'User is logged in', isLoggedIn: true, user: req.session.user });
        } else {
            res.status(200).json({ message: 'User is not logged in', isLoggedIn: false, user: null });
        }
    },
};

export default userController;
