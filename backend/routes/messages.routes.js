import express from 'express';
import  {sendMessageController, getMessagesController}  from '../controllers/messages.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();

router.post('/send/:id', protectedRoute, sendMessageController);

router.get('/get/:id', protectedRoute, getMessagesController);

export default router;
