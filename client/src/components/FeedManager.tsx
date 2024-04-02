import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { addFeed } from '../services/feedService';
import FeedList from './features/FeedList';
import ArticleList from './features/ArticleList';
import ArticleDetails from './features/ArticleDetails';

const FeedManager = () => {
  const [feedUrl, setFeedUrl] = useState('');
  const [selectedFeed, setSelectedFeed] = useState('');
  const [selectedArticle, setSelectedArticle] = useState({});

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await addFeed({ url: feedUrl });
    setFeedUrl('');
    // Optionally, trigger a refresh of the feed list
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FeedList
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed} />
        </Grid>
        <Grid item xs={4}>
          <ArticleList 
            feedId={selectedFeed}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        </Grid>
        <Grid item xs={4}>
          <ArticleDetails article={selectedArticle} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeedManager;
