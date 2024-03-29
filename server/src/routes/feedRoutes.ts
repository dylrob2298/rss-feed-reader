import express from 'express';
import { addFeed, listFeeds, removeFeed, updateFeedArticles } from '../controllers/feedController';

const router = express.Router();

router.post('/', addFeed);
router.get('/', listFeeds);
router.delete('/:id', removeFeed);
router.post('/update-articles', updateFeedArticles)

export default router;
