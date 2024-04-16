import { Request, Response } from "express";
import Feed from "../models/Feed";
import { fetchAndUpdateArticles } from "../services/feedService";
import { delay } from "../utils/utils";

export const addFeed = async (req: Request, res: Response) => {
    try {
        const newFeed = new Feed(req.body);
        const savedFeed = await newFeed.save();
        await fetchAndUpdateArticles(savedFeed.url);
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
        console.log('body: ', req.body)
        const { feedUrl } = req.body;
        console.log('feedUrl: ', feedUrl)
        // Retrieve the feed by ID
        const feed = await Feed.findOne({ url: feedUrl });
        if (!feed) {
            res.status(404).json({ message: "Feed not found" });
            return;
        }

        // Check if it's been more than an hour since the last update
        const lastUpdated = new Date(feed.lastUpdated);
        const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
        if (lastUpdated > oneHourAgo) {
            res.json({ message: `No update needed for feed: ${feedUrl}. Last updated less than an hour ago.`});
            return;
        }
        await fetchAndUpdateArticles(feedUrl);
        res.json({ message: `Articles update initiated for feed: ${feedUrl}`});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAllFeedArticles = async (req: Request, res: Response) => {
    try {
        const feeds = await Feed.find();
        const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
        for (const feed of feeds) {
            const lastUpdated = new Date(feed.lastUpdated);

            if (lastUpdated <= oneHourAgo) {
                
                const { url: feedUrl } = feed;
                await fetchAndUpdateArticles(feedUrl);
            } else {
                console.log(`Articles already up to date for feed: ${feed.url}`)
            }
        }
        
        res.json({ message: `Articles update initiated for feeds`});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}