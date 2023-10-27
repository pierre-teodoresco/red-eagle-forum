// MessageController.js
import Message from '../models/Message.js';

export default {

    findAll: (req, res) => {
        try {
            const topic = req.params.topic;
            const messages = Message.getFromTopic(topic);
            res.status(200).json({ message: 'Messages found successfully', messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

};