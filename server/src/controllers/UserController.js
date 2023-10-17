// UserController.js
import User from '../models/User.js';

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
                
                // Copy user object
                const userToSend = { ...user.toObject() };

                // Delete password from user object
                delete userToSend.password;

                // Send user data
                res.status(200).json(userToSend);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default userController;
