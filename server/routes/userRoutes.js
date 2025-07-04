import express from 'express';
import { savePreferences } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/preferences', authMiddleware, savePreferences);

export default router;
