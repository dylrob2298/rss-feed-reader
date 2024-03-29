import 'dotenv/config';
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected...');
    } catch(error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;