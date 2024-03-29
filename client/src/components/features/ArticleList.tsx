import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { getArticles } from '../../services/articleService';

const ArticleList = ({ feedId }: any) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles(feedId);
            setArticles(fetchedArticles);
        };

        if (feedId) {
            fetchArticles();
        }
    }, [feedId]);

    return (
        <List>
            {articles.map((article: any) => (
                <ListItemButton key={article._id}>
                    <ListItemText primary={article.title} secondary={article.publishedDate} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default ArticleList;