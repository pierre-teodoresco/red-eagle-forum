// UserController.js

import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const userController = {
    /**
     * @brief register a new user
     */
    register: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            await User.insert(username, password);
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
            const user = await User.getByUsername(req.query.username);

            // Check if user exists and password is correct
            if (!user || user.password !== req.query.password) {
                // Wrong username or password
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            } else {
                // User found, return user data
                
                // Generate token
                const payload = { username: user.username };
                const options = { expiresIn: '1h' };
                req.session.token = jwt.sign(payload, process.env.JWT_SECRET, options);

                // Copy user object and add token
                const userData = { ...user.toObject(), token: req.session.token };

                // Delete password from user object
                delete userData.password;

                // Send user data
                res.status(200).json(userData);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * @brief check token validity
     */
    checkToken: (req, res) => {
        try {
            const token = req.query.token;
    
            // Check if the token is valid
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    // Token is not valid
                    res.status(200).json({ isValid: false });
                } else {
                    // Token is valid

                    // Build back the user from the token payload
                    const user = {
                        username: decoded.username, 
                    };

                    res.status(200).json({ isValid: true, user });
                }
            });
        } catch (error) {
            console.error('Error checking token validity:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * @brief logout the user by destroying the session
     */
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            // Rediriger ou renvoyer une réponse réussie
            res.json({ message: 'Logout successful' });
        });
    },
    /**
     * @brief middleware to check if user is logged in
     */
    isLoggedIn: (req, res, next) => {
        if (req.session.token) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
};

export default userController;
