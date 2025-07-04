import express from 'express';
import { getMatches } from '../controllers/neighborhoodController.js';
const router = express.Router();
router.post('/match', getMatches);
export default router;
