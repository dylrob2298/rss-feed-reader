import { Request, Response } from "express";
import Feed from "../models/Feed";
import { fetchAndUpdateArticles } from "../services/feedService";

export const addFeed = async (req: Request, res: Response) => {
    try {
        const newFeed = new Feed(req.body);
        const savedFeed = await newFeed.save();
        res.status(201).json(savedFeed);
    } catch(error: any) {
        res.status(400).json({ message: error.message })
    }
};

export const listFeeds = async (req: Request, res: Response) => {
    try {
        const feeds = await Feed.find();
        res.json(feeds);
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};

export const removeFeed = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFeed = await Feed.findByIdAndDelete(id);
        if (!deletedFeed) return res.status(404).json({ message: 'Feed not found'});
        res.status(200).json({ message: 'Feed removed', feed: deletedFeed });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFeedArticles = async (req: Request, res: Response) => {
    try {
        const { feedUrl } = req.body;
        await fetchAndUpdateArticles(feedUrl);
        res.json({ message: `Articles update initiated for feed: ${feedUrl}`});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}