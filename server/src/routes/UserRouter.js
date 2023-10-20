// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/check-login', userController.checkLogin);
router.post('/update/:username', userController.update);

export default router;
