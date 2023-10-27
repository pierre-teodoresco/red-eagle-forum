// MessageController.js
import Message from '../models/Message.js';

export default {
    findAll: async (req, res) => {
        try {
            console.log(req.params.label);
            const topic = req.params.label;
            const messages = await Message.getFromTopic(topic);
            res.status(200).json({ message: 'Messages found successfully', messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    create: async (req, res) => {
        try {
            const message = req.body;
            message.creationDate = new Date();
            await Message.insert(message);
            res.status(200).json({ message: 'Message created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};