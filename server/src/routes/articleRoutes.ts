import express from 'express';
import { listArticles, markArticleRead, favoriteArticle } from '../controllers/articleController';

const router = express.Router();

router.get('/', listArticles);
router.patch('/:id/read', markArticleRead);
router.patch('/:id/favorite', favoriteArticle);

export default router;