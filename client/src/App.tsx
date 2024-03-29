import React from 'react';
import { Container, Grid } from '@mui/material';
import FeedList from './components/features/FeedList';
import ArticleList from './components/features/ArticleList';
import FeedManager from './components/features/FeedManager';

function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FeedManager />
          <FeedList />
        </Grid>
        <Grid item xs={8}>
          <ArticleList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
