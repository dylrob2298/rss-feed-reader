import { Request, Response } from "express";
import Article from "../models/Article";
import { summarizeArticleWithAI } from "../services/articleService";

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

export const summarizeArticle = async (req: Request, res: Response) => {
    try {
        const { articleUrl }: { articleUrl: string} = req.body;
        console.log('article url: ', articleUrl)
        const article = await Article.findOne({ link: articleUrl})
        if (article?.summary !== undefined) {
            console.log(article.summary);
            const articleSummary = article.summary;
            res.json(articleSummary);
            return
        }
        const articleSummary = await summarizeArticleWithAI(articleUrl.trim());
        await Article.findOneAndUpdate({ link: articleUrl }, { $set: { summary: articleSummary } }, { new: true })
        
        res.json(articleSummary);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}