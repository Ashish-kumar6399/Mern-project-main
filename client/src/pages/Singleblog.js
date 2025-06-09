import { useEffect, useState } from "react";

export default function SingleBlog () {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg shadow-sm overflow-hidden bg-white"
            >
              <img
                src={`/uploads/${blog.image}`}
                alt={blog.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.name}</h2>
                <p className="text-gray-700">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
