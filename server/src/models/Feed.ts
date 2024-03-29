import mongoose, { Document, Schema } from "mongoose";

interface IFeed extends Document {
    url: string;
    title: string;
    category?: string;
    lastUpdated: Date;
}

const FeedSchema: Schema = new Schema({
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

const Feed = mongoose.model<IFeed>('Feed', FeedSchema);

export default Feed;