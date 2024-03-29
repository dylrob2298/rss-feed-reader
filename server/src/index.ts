import 'dotenv/config';
import express from 'express';
import connectDB from './config/db';
import feedRoutes from './routes/feedRoutes';
import articleRoutes from './routes/articleRoutes';
import cron from 'node-cron'
import { fetchAndUpdateArticles } from './services/feedService';
import Feed from './models/Feed';

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// cron.schedule('0 * * * *', async () => {
//     const feeds = await Feed.find();
//     feeds.forEach(feed => {
//         fetchAndUpdateArticles(feed.url);
//     });
// });

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('RSS Feed Reader server is running...');
});

app.use('/feeds', feedRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

