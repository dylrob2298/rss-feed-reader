import express from 'express';
import { listArticles, markArticleRead, favoriteArticle, listArticlesFromFeed } from '../controllers/articleController';

const router = express.Router();

router.get('/', listArticles);
router.get('/:id', listArticlesFromFeed);
router.patch('/:id/read', markArticleRead);
router.patch('/:id/favorite', favoriteArticle);

export default router;