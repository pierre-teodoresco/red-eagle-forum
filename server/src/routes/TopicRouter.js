// routes/userRoutes.js
import express from 'express';
import topicController from '../controllers/TopicController.js';

const router = express.Router();

router.post('/create', topicController.create);
router.get('/findAll', topicController.findAll);
router.get('/:label', topicController.findOne);
router.delete('/:label', topicController.delete);
router.put('/update', topicController.update);


export default router;
