import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { getFeeds } from '../../services/feedService';

const FeedList = () => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            const fetchedFeeds = await getFeeds();
            setFeeds(fetchedFeeds);
        }
        fetchFeeds();
    }, []);

    return (
        <List>
            {feeds.map((feed: any) => (
                <ListItemButton key={feed._id}>
                    <ListItemText primary={feed.title} />
                </ListItemButton>
            ))}
        </List>
    )
}

export default FeedList;