import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { addFeed } from '../../services/feedService';

const FeedManager = () => {
  const [feedUrl, setFeedUrl] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await addFeed({ url: feedUrl });
    setFeedUrl('');
    // Optionally, trigger a refresh of the feed list
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Feed URL"
        variant="outlined"
        value={feedUrl}
        onChange={(e) => setFeedUrl(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add Feed
      </Button>
    </form>
  );
};

export default FeedManager;
