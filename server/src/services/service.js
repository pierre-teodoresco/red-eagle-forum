// src/services/service.js

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export default {
    generateSessionToken(user) {
        const payload = { username: user.username };
        const options = { expiresIn: '1h' };
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    },
}