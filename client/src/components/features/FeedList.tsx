import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { getFeeds, updateAllFeeds, updateFeed } from '../../services/feedService';


const FeedList = ({ selectedFeed, setSelectedFeed, feedId, setFeedId }: any) => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            const fetchedFeeds = await getFeeds();
            fetchedFeeds.sort((a: any, b: any) => a.title.localeCompare(b.title));
            setFeeds(fetchedFeeds);
        }
        fetchFeeds();
    }, []);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        feed: any,
    ) => {
        setSelectedFeed(feed.url);
        setFeedId(feed._id);
        updateFeed(feed.url);
    }

    return (
        <List style={{ maxHeight: '900px', overflowY: 'auto' }}>
            {feeds.map((feed: any) => (
                <ListItemButton 
                    key={feed.url}
                    selected={selectedFeed === feed.url}
                    onClick={(event) => handleListItemClick(event, feed)}
                >
                    <ListItemText primary={feed.title} />
                </ListItemButton>
            ))}
        </List>
    )
}

export default FeedList;