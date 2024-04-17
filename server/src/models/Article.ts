import mongoose, { Document, Schema } from "mongoose";

interface IArticle extends Document {
    feedId: Schema.Types.ObjectId;
    title: string;
    link: string;
    content?: string;
    isRead: boolean;
    isFavorite: boolean;
    publishedDate: Date;
    summary?: string;
}

const ArticleSchema: Schema = new Schema({
    feedId: { type: Schema.Types.ObjectId, ref: 'Feed', required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    content: { type: String },
    isRead: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    publishedDate: { type: Date, required: true },
    summary: { type: String },
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;