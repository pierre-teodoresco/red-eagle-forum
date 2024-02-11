// Topic.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TopicModel = {
    /**
     * @brief Insert a new topic into db
     * @param {JSON} topic 
     */
    insert: async (topic) => {
        await prisma.topic.create({
            data: {
                label: topic.label,
                description: topic.description,
                creationDate: topic.creationDate,
                creationUser: topic.creationUser,
            },
        });
    },

    save: async (topic) => {
        await prisma.topic.update({
            where: { id: topic.id },
            data: {
                label: topic.label,
                description: topic.description,
                creationDate: topic.creationDate,
                creationUser: topic.creationUser,
            },
        });
    },

    update: async (topic) => {
        await prisma.topic.update({
            where: { label: topic.label },
            data: {
                label: topic.label,
                description: topic.description,
                creationDate: topic.creationDate,
                creationUser: topic.creationUser,
            },
        });
    },

    /**
     * @brief get topic by label
     * @param {string} label 
     * @returns {string || null} depending on whether the topic is found or not
     */
    findOne: async (label) => {
        return await prisma.topic.findUnique({ 
            where: { label },
        });
    },

    getAllTopicsWithLimit: async (limit) => {
        return await prisma.topic.findMany({
            take: parseInt(limit),
        });
    },

    delete: async (label) => {
        await prisma.topic.delete({
            where: { label },
        });
    },
};

export default TopicModel;