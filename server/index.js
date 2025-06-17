import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 9000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public/uploads directory
app.use("/uploads", express.static(path.resolve(__dirname, "public/uploads")));

// Test static file serving
app.get("/test-image", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/uploads/1750078435318-favicon.webp")); // Place a test.jpg in uploads for this test
});

const startServer = async () => {
    try {
        await connectToMongo();

        app.get("/", (req, res) => {
            res.json({ message: "API is running" });
        });

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
            console.log(`Test image: http://localhost:${PORT}/uploads/test.jpg`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();