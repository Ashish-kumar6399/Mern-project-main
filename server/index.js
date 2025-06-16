import express from "express"
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js"
import cors from "cors";

const app = express()
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with error handling
const startServer = async () => {
    try {
        await connectToMongo();
        
        app.get("/", (req,res)=>{
            res.json({ message: "API is running" });
        })

        // Api Routes
        app.use("/api/v1", authRoutes);

        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ 
                success: false,
                message: "Route not found" 
            });
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ 
                success: false,
                message: "Something went wrong!",
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();