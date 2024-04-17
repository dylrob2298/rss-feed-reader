import 'dotenv/config';
import express from 'express';
import connectDB from './config/db';
import feedRoutes from './routes/feedRoutes';
import articleRoutes from './routes/articleRoutes';
import cors from 'cors';
import cron from 'node-cron'
import { fetchAndUpdateArticles } from './services/feedService';
import Feed from './models/Feed';
import { updateAllFeedArticles } from './controllers/feedController';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

connectDB();

cron.schedule('0 * * * *', async () => {
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
        
        console.log({ message: `Articles update initiated for feeds`});
    } catch (error: any) {
        console.log({ message: error.message });
    }
});

app.use(cors({ origin: CLIENT_BASE_URL }));
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('RSS Feed Reader server is running...');
});

app.use('/feeds', feedRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

