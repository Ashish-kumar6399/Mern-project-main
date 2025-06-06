import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
        const res = await mongoose.connect(
            "mongodb+srv://webskynetiks:webskynetiks123@cluster0.7hfnxyq.mongodb.net/blog-mern-project?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Connected to MongoDB Atlas successfully");
        return res;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectToMongo;

