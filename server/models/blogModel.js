import mongoose from "mongoose";

const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"categories",
        
    },

    description:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"users",
        required:true
    },
})


const blogModel = mongoose.model("blogs",blogSchema);
export default blogModel;
