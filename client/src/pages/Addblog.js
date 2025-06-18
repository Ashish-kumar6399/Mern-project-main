import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories
// Fetch categories
  useEffect(() => {
  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("https://mern-project-main-pyk3.vercel.app/api/v1/get/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Fetched Categories from API:", res.data);
      setCategories(res.data); // 👈 Make sure this matches your backend response
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  fetchAllCategories();
  
}, 
[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("category", input.category);
    formdata.append("description", input.description);
    formdata.append("thumbnail", file);


    console.log("📤 Submitting Blog Data:");
console.log("Title:", input.title);
console.log("Category (should be _id):", input.category);
console.log("Description:", input.description);
console.log("File:", file);


    const token = localStorage.getItem("token");
    console.log("Token used in add/blog:", token);

    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/add/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Add blog response:", res.data);
      alert(res.data.message || "Blog added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error.response?.data?.message || error.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center text-primary mb-4">Add a New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Blog Title"
            name="title"
            value={input.title}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
  <Form.Label>Category</Form.Label>
  <select
    className="form-control"
    name="category"
    value={input.category}
    onChange={(e) => setInput({ ...input, category: e.target.value })}
    required
  >
    <option disabled value="">
      Select category
    </option>
    {Array.isArray(categories) &&
      categories.map((item) => {
        if (!item || !item._id || !item.title) {
          console.warn("Invalid category:", item);
          return null;
        }
        return (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        );
      })}
  </select>
</Form.Group>


        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Blog Description"
            name="description"
            value={input.description}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formThumbnail" className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Add Blog
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddBlog;
