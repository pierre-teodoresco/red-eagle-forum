// routes/userRoutes.js
import express from 'express';
import topicController from '../controllers/TopicController.js';

const router = express.Router();

router.post('/', topicController.create);
router.get('/', topicController.findAll);
router.get('/:label', topicController.findOne);
router.delete('/:label', topicController.delete);
router.put('/', topicController.update);


export default router;
