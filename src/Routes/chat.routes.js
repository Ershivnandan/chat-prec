import express from 'express';
import { sendMessage, getChatHistory, editMessage, deleteMessage, getOnlineUsersList } from '../Controllers/chat.controller.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/history/:roomId', getChatHistory);
router.put('/edit', editMessage);
router.delete('/delete', deleteMessage);
router.get('/online-users', getOnlineUsersList);

export default router;
