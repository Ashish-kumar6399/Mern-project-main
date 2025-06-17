import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleBlog () {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
   const fetchSingleBlog =async () =>{
    const res =await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      
    )
    setBlogs(res.data); // Assuming the response is a single blog object
   };
    fetchSingleBlog();
  }, []);

  return (
    
    <>
    
    <div className="container shadow my-3">
      <div className="col-md-12 d-flex items-center justify-content-center">
        <div className="row">
          <h1>
            {blogs.title}

          </h1>
          <img
            src={`http://localhost:9000${blogs.thumbnail}`}
            alt="Blog Thumbnail"
            className="img-fluid mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <p>
            {blogs.description}
          </p>
          <button>
            <a href="/home" className="btn btn-primary">
              Back to Home
            </a>
          </button>
        </div>

      </div>

    </div>
    </>
  );
}
