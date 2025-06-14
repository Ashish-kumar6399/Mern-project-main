import blogModel from "../models/blogModel.js";

class BlogController {
  static getAllBlogs =async(req,res) =>{
    try {
      const fetchAllBlogs =await blogModel.find({user:req.user._id});
      return res.status(200).json(fetchAllBlogs);
    } catch (error) {
      return res.status(400).json({message:error.message})
      
    }
    // ashish
  };
 static addNewBlog = async (req, res) => {
  const { title, description, category } = req.body;
  console.log("Incoming Blog Body:", req.body);
  console.log("Uploaded File:", req.file);
  console.log("User ID:", req.user?._id);

  try {
    if (title && description && category && req.file && req.user?._id) {
      const addBlog = new blogModel({
        title: title,
        description: description,
        category: category,
        thumbnail: `/uploads/${req.file.filename}`,
        user: req.user._id,
      });

      const savedBlog = await addBlog.save();
      console.log("Saved Blog:", savedBlog);

      return res.status(200).json({ message: "Blog added successfully" });
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    console.error("Blog Save Error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

  static getSingleBlog =async(req,res) =>{
    const {id} =req.params;
    try {
      if(id){
        const fetchBlogById =await blogModel.findById(id);
        return res.status(200).json(fetchBlogById);
      }else{
        return res.status(400).json({message:"invalid url"});
      }
      
    } catch (error) {
      return res.status(400).json({message:error.message})
      
    }
  };


}


export default  BlogController;