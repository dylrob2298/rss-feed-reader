import Parser from "rss-parser";
import Feed from "../models/Feed";
import Article from "../models/Article";

const parser = new Parser();

const fetchAndUpdateArticles = async (feedUrl: string) => {
    try {
        const feed = await parser.parseURL(feedUrl);
        const existingFeed = await Feed.findOneAndUpdate({ url: feedUrl }, { $set: { lastUpdated: new Date() } }, { new: true });

        if (!existingFeed) {
            console.error('Feed not found: ', feedUrl);
            return;
        }

        for (const item of feed.items) {
            const existingArticle = await Article.findOne({ link: item.link });

            if (!existingArticle) {
                const newArticle = new Article({
                    feedId: existingFeed._id,
                    title: item.title,
                    link: item.link,
                    content: item.contentSnippet,
                    publishedDate: item.pubDate ? new Date(item.pubDate) : new Date(),
                });

                await newArticle.save();
            }
        }

        console.log(`Articles updated for feed: ${feedUrl}`);
    } catch (error: any) {
        console.error(`Error fetching/updating articles: ${feedUrl}`, error)
    }
};

export { fetchAndUpdateArticles }
