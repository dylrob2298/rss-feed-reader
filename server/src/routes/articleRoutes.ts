import express from 'express';
import { listArticles, markArticleRead, favoriteArticle, listArticlesFromFeed, summarizeArticle } from '../controllers/articleController';

const router = express.Router();

router.get('/', listArticles);
router.get('/:id', listArticlesFromFeed);
router.patch('/:id/read', markArticleRead);
router.patch('/:id/favorite', favoriteArticle);
router.post('/summary', summarizeArticle);

export default router;