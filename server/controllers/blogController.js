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
  static addNewBlog =async(req,res) =>{
  const {title,description,category} = req.body;
  try {
    if(title && description && category){
      const addBlog =new blogModel({
        title:title,
        description:description,
        category:category,
        thumbnail:req.file.filename,
        user:req.user._id,
      })

      const savedBlog =await addBlog.save();
      if(savedBlog){
        return res.status(200).json({message:"Blog added successfully"});
      }
      
    }else{
      return res.status(400).json({message:"All fields are required"});
    }
    
  } catch (error) {

          return res.status(400).json({message:error.message})

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