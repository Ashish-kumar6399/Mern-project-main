import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";





// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });


const router = express.Router();

// Auth routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//protected Routes

router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog",upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.getAllBlogs);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);

router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/category",  CategoryController.addNewCategory)






export default router;