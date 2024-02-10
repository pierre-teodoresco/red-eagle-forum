// controllers/UserController.js

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

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
                email: req.body.email,
                password: hashedPassword,
            };
            await User.insert(user)
                .then(Service.prismaEnd)
                .catch(Service.prismaErrorHandler);

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
            const user = await User.getByUsername(req.body.username).then(Service.prismaEnd).catch(Service.prismaErrorHandler);

            // Check if user exists and password is correct
            if (!user || !(await Service.comparePassword(user.password, req.body.password))) {
                // Wrong username or password
                res.status(401).json({ error: 'Invalid credentials' });
            } 

            // We use toObject() because user is a mongoose object
            req.session.user = Service.createSession(user.toObject());

            if (req.body.rememberMe) {
                const payload = { username: user.username };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.status(200).json({ message: 'Logged in successfully', token: token  });
                return;
            }
            
            res.status(200).json({ message: 'Logged in successfully' });
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
            // Check if the user is logged in
            if (!req.session.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            // Create a new session with the updated user
            const updatedUser = await User.update(req.params.username, req.body).then(Service.prismaEnd).catch(Service.prismaErrorHandler);
            req.session.user = Service.createSession(updatedUser);
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * @brief check remember me token
     */
    checkRememberMe: async (req, res) => {
        try {
            const token = req.query.token;
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.getByUsername(payload.username).then(Service.prismaEnd).catch(Service.prismaErrorHandler);

            if (!user) {
                res.status(401).json({ error: 'Invalid token' });
            } else {
                res.status(200).json({ message: 'Valid token', user: user });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default userController;
