// UserController.js
import { register, login } from '../models/User.js';

const userController = {
    /**
     * @brief wrap the register model function
     */
    register: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            await register(username, password);
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
            const username = req.query.username;
            const password = req.query.password;
            const user = await login(username, password);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default userController;
