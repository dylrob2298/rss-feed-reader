import React, { useState } from 'react';
import { Button, TextField, Grid, Paper } from '@mui/material';
import { addFeed, updateAllFeeds } from '../../services/feedService';

function AddFeed() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!url || !title) return; // Basic validation
    addFeed({ url, title, category });
    setUrl(''); // Reset the form
    setTitle('');
    setCategory('');
    updateAllFeeds();
  };

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Feed URL"
              fullWidth
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Feed Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Feed Category"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Feed
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AddFeed;
