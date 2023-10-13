// UserController.js
import { addUser } from '../models/user.js';

const userController = {
    addUser: async (req, res) => {
        try {
            const name = req.body.name;
            console.log(name);
            await addUser(name);
            res.status(200).json({ message: 'User added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export default userController;
