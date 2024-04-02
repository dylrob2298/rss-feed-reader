import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Link } from '@mui/material';

const ArticleDetails = ({ article }: any) => {
  if (!article) {
    return <Typography variant="h6">No article selected</Typography>;
  }

  const { title, link, content, publishedDate } = article;

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader title={title} />
      {link && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Link href={link} target="_blank" underline="none">
              Original Article
            </Link>
          </Typography>
        </CardContent>
      )}
      {content && (
        <CardContent>
          <Typography variant="body1">{content}</Typography>
        </CardContent>
      )}
      {publishedDate && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Published: {new Date(publishedDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ArticleDetails;
