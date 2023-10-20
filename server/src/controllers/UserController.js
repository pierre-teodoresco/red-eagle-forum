// controllers/UserController.js

import User from '../models/User.js';
import Service from '../services/service.js';

const userController = {
    /**
     * @brief register a new user
     */
    register: async (req, res) => {
        try {
            const sameUsername = await User.getByUsername(req.body.username);
            if (sameUsername) {
                // Username already exists
                res.status(409).json({ error: 'Username already exists' });
                return;
            }
            
            const hashedPassword = await Service.hashPassword(req.body.password);
            const user = {
                username: req.body.username,
                password: hashedPassword,
            };
            await User.insert(user);

            // Create a session for the user (log them in)
            req.session.user = Service.createSession(user);

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

            // Check if user exists and password is correct
            if (!user || !(await Service.comparePassword(user.password, req.body.password))) {
                // Wrong username or password
                res.status(401).json({ error: 'Invalid credentials' });
            } else {
                // User found and password correct
                // We use toObject() because user is a mongoose object
                req.session.user = Service.createSession(user.toObject());
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
    /**
     * @brief update user's fields
     */
    update: async (req, res) => {
        try {
            const updatedFields = {};
            if (req.body.email) {
                updatedFields.email = req.body.email;
            }
            if (req.body.name) {
                updatedFields.name = req.body.name;
            }
            if (req.body.surname) {
                updatedFields.surname = req.body.surname;
            }
            if (req.body.password) {
                updatedFields.password = await Service.hashPassword(req.body.password);
            }
            const updatedUser = await User.update(req.params.username, updatedFields);
            delete updatedUser.password;
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export default userController;
