// MessageController.js
import Message from '../models/Message.js';

export default {
    findAll: async (req, res) => {
        try {
            const topic = req.params.topic;
            const messages = await Message.getFromTopic(topic);
            console.log(messages);
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