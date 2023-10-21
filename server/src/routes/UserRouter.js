// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/check-login', userController.checkLogin);
router.post('/update/:username', userController.update);
router.get('/check-remember-me', userController.checkRememberMe);

export default router;
