import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { getArticles, getArticlesForFeed } from '../../services/articleService';

const ArticleList = ({ feedId, selectedArticle, setSelectedArticle }: any) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles();
            fetchedArticles.sort((a: any, b: any) => new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf());
            setArticles(fetchedArticles);
        };
        const fetchArticlesForFeed = async (feedId: string) => {
            const fetchedArticles = await getArticlesForFeed(feedId)
            fetchedArticles.sort((a: any, b: any) => new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf());
            setArticles(fetchedArticles);
        }

        if (feedId) fetchArticlesForFeed(feedId)
        else fetchArticles();
    }, [feedId]);

    
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        article: any,
    ) => {
        setSelectedArticle(article);
    }

    return (
        <List style={{ maxHeight: '1200px', overflowY: 'auto' }}>
            {articles.map((article: any) => (
                <ListItemButton key={article._id}
                selected={selectedArticle && selectedArticle._id === article._id}
                onClick={(event) => handleListItemClick(event, article)}
                >
                    <ListItemText primary={article.title} secondary={article.publishedDate} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default ArticleList;