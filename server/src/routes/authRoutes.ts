import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController';
import {authenticateToken}  from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/', loginUser);

// Protected route
router.get('/', authenticateToken, getProfile);

export default router;
