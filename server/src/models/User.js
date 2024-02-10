// models/User.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    /**
     * @brief Insert a new user into db
     * @param {JSON} user 
     */
    insert: async (user) => {
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
            },
        });
    },
    /**
     * @brief get user by username
     * @param {string} username 
     * @returns {string || null} depending on whether the user is found or not
     */
    getByUsername: async (username) => {
        return await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
    },
    /**
     * @brief Update user fields
     * @param {string} username - Username of the user to update
     * @param {object} updatedFields - Object containing the fields to update
     * @returns {object} - Updated user object
     */
    update: async (username, updatedFields) => {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Update fields
        const updatedUser = await prisma.user.update({
            where: {
                username: username,
            },
            data: updatedFields,
        });

        return updatedUser;
    },
};