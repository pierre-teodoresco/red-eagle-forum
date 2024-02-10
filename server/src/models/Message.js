// Message.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MessageModel = {
    /**
     * @brief Insert a new message into db
     * @param {JSON} message 
     */
    insert: async (message) => {
        await prisma.message.create({
            data: {
                topic: message.topic,
                content: message.content,
                creationDate: message.creationDate,
                creationUser: message.creationUser,
            },
        });
    },

    /**
     * @brief Get all messages from a topic
     * @param {String} topic
     */
    getFromTopic: async (topic) => {
        return await prisma.message.findMany({
            where: {
                topic: topic,
            },
        });
    },

    /**
     * @brief Delete all messages from a topic
     * @param {String} id 
     */
    delete: async (id) => {
        await prisma.message.delete({
            where: {
                id: id,
            },
        });
    },
};

export default MessageModel;