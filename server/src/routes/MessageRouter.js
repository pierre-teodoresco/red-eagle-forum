// routes/messageRouter.js
import express from 'express';
import messageController from '../controllers/MessageController.js';

const router = express.Router();

router.get('/:topic', messageController.findAll);

export default router;
