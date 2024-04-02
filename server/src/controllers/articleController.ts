import { Request, Response } from "express";
import Article from "../models/Article";

export const listArticles = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find().populate('feedId', 'title');
        res.json(articles);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const listArticlesFromFeed = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articles = await Article.find({ feedId: { _id: id } }).populate('feedId', 'title');
        res.json(articles);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const markArticleRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndUpdate(id, { isRead: true}, { new: true });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const favoriteArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndUpdate(id, { isFavorite: true}, { new: true });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}