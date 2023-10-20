// src/services/service.js

import dotenv from 'dotenv';
dotenv.config();

import argon2 from 'argon2';

export default {
    /**
     * @brief chiffre le mot de passe avec bcrypt
     * @param {string} password
     * @return {string} password hash
     */
    async hashPassword(password) {
        try {
            const hashedPassword = await argon2.hash(password);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    },
    /**
     * @brief compare password and hash
     * @param {string} password
     * @param {string} hash
     * @return {boolean} true if password and hash match, false otherwise
     */
    async comparePassword(password, hash) {
        try {
            const isMatch = await argon2.verify(password, hash);
            return isMatch;
        } catch (error) {
            console.error('Error comparing password:', error);
            throw error;
        }
    },
}