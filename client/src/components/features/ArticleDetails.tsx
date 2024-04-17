import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Link,
  Button,
  CircularProgress,
  Box,
  IconButton
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Markdown from 'react-markdown';
import { getArticleSummary } from '../../services/articleService';


const ArticleDetails = ({ article }: any) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('Not generated');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset summary state when the article changes
    setSummary('');
    setShowSummary(false);
  }, [article]);

  if (!article) {
    return <Typography variant="h6">No article selected</Typography>;
  }

  const { title, link, content, publishedDate } = article;

  const handleToggleSummary = async () => {
    setShowSummary((prevShowSummary) => !prevShowSummary);
    
    if (!showSummary) {
      setIsLoading(true);
      try {
        const articleSummary = await getArticleSummary(link);
        setSummary(articleSummary);
      } catch (error) {
        console.error("Failed to fetch article summary:", error);
        setSummary("Failed to generate summary.");
      }
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <CardHeader 
        title={title} 
        subheader={`Published: ${new Date(publishedDate).toLocaleDateString()}`}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
      {link && (
          <Button component={Link} href={link} target="_blank" aria-label="original-article">
            Original Link<OpenInNewIcon />
          </Button>
        )}
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : showSummary ? (
          <Typography variant="body1"><Markdown>{summary}</Markdown></Typography>
        ) : (
          <Typography variant="body1">{content}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleToggleSummary} variant="contained" color="primary">
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleDetails;
