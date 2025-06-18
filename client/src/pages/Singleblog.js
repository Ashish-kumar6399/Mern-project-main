import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await axios.get(`https://mern-project-main-pyk3.vercel.app/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container text-center mt-5">
        <h3>Blog not found</h3>
      </div>
    );
  }

  return (
    <div className="container my-5 p-4 shadow-lg rounded">
      <h2 className="mb-3 fw-bold text-center">{blog.title}</h2>

      <div className="text-center mb-4">
        <img
          src={`http://localhost:9000${blog.thumbnail}`}
          alt="Blog Thumbnail"
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      <p className="fs-5">{blog.description}</p>

      <div className="text-center mt-4">
        <Link to="/home" className="btn btn-outline-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
