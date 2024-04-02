import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { getFeeds } from '../../services/feedService';

const FeedList = ({ selectedFeed, setSelectedFeed }: any) => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            const fetchedFeeds = await getFeeds();
            setFeeds(fetchedFeeds);
        }
        fetchFeeds();
    }, []);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        feedId: string,
    ) => {
        setSelectedFeed(feedId);
    }

    return (
        <List>
            {feeds.map((feed: any) => (
                <ListItemButton 
                    key={feed._id}
                    selected={selectedFeed === feed._id}
                    onClick={(event) => handleListItemClick(event, feed._id)}
                >
                    <ListItemText primary={feed.title} />
                </ListItemButton>
            ))}
        </List>
    )
}

export default FeedList;