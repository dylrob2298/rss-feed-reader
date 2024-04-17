import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { addFeed } from '../services/feedService';
import FeedList from './features/FeedList';
import ArticleList from './features/ArticleList';
import ArticleDetails from './features/ArticleDetails';
import AddFeed from './features/AddFeed';

const FeedManager = () => {
  const [feedId, setFeedId] = useState('');
  const [selectedFeed, setSelectedFeed] = useState('');
  const [selectedArticle, setSelectedArticle] = useState({});

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   await addFeed({ url: feedUrl });
  //   setFeedUrl('');
  //   // Optionally, trigger a refresh of the feed list
  // };

  return (
    <Container maxWidth={false}>
      <Grid container spacing={5}>
        <Grid item xs={2}>
          <AddFeed />
          <FeedList
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
            feedId={feedId}
            setFeedId={setFeedId} 
          />
        </Grid>
        <Grid item xs={3}>
          <ArticleList 
            feedId={feedId}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        </Grid>
        <Grid item xs={7}>
          <ArticleDetails article={selectedArticle} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeedManager;
