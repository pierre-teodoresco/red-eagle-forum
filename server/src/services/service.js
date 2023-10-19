// src/services/service.js

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default {
    /**
     * @brief check if the session token is valid
     * @param {string} token
     * @return {object} { isValid: boolean, user: object }
     */
    generateSessionToken(user) {
        const payload = { username: user.username };
        const options = { expiresIn: '1h' };
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    },
    /**
     * @brief chiffre le mot de passe avec bcrypt
     * @param {string} password
     * @return {string} password hash
     */
    cryptPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    /**
     * @brief compare password and hash
     * @param {string} password
     * @param {string} hash
     * @return {boolean} true if password and hash match, false otherwise
     */
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
}