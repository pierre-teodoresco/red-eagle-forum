// routes/messageRouter.js
import express from 'express';
import messageController from '../controllers/MessageController.js';

const router = express.Router();

router.get('/:label', messageController.findAll);
router.post('/', messageController.create);

export default router;
