// UserController.js
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

const userController = {
    /**
     * @brief wrap the register model function
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
     * @brief wrap the register model function
     */
    login: async (req, res) => {
        try {
            // Get user from database
            const user = await User.getByUsername(req.query.username);

            if (!user || user.password !== req.query.password) {
                // Wrong username or password
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            } else {
                // User found, return user data
                
                // Generate token
                req.session.token = uuidv4();

                // Copy user object
                const userData = { ...user.toObject() };

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
