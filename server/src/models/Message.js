// Message.js
import mongoose from 'mongoose';

const Message = mongoose.model('Message', {
    topic: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    creationDate: Date,
    creationUser: {
        type: String,
        required: true,
        trim: true,
    },
});

const MessageModel = {
    /**
     * @brief Insert a new message into db
     * @param {JSON} message 
     */
    insert: async (message) => {
        const newMessage = new Message({
            topic: message.topic,
            content: message.content,
            creationDate: message.creationDate,
            creationUser: message.creationUser,
        });

        await newMessage.save();
    },

    /**
     * @brief Get all messages from a topic
     * @param {String} topic
     */
    getFromTopic: async (topic) => {
        return await Message.find({ topic: topic });
    },

    /**
     * @brief Delete all messages from a topic
     * @param {String} id 
     */
    delete: async (id) => {
        await Message.deleteOne(id);
    },
};

export default MessageModel;