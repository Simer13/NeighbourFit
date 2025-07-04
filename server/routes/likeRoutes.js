import express from 'express';
import { likeNeighborhood, unlikeNeighborhood } from '../controllers/likeController.js';
const router = express.Router();

router.post('/like', likeNeighborhood);
router.post('/unlike', unlikeNeighborhood);

export default router;
