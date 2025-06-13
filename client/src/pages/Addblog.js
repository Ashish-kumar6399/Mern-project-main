import  { useState,useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import {useNavigate } from "react-router-dom";


const AddBlog = () => {

  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: "",
  });
  useEffect(() => {
  const fetchAllcategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/v1/get/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  fetchAllcategories();
}, []);

  const [file, setFile] = useState([]);
  const[ categories, setCategories ] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "thumbnail" ? files[0] : value,
    });
  };


  const formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("category", input.category);
    formdata.append("description", input.description);
    formdata.append("thumbnail", file);
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const res = await axios.post("http://localhost:9000/api/v1/add/blog", 
        formdata);
        alert(res.data.message || "Blog added successfully!");
        navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error.response.data.message || error.message);
      
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
            onChange={(e) => setInput({ ...input,[e.target.name]: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
         
          <select 
  className="form-control"
  name="category"
  // value={formData.category}
  //           onChange={(e) => setInput({ ...input,[e.target.name]: e.target.value })}
  //           required
>
  <option disabled value="">Select category</option>
  {categories.map((item) => (
    <option key={item._id} value={item._id}>{item.title}</option>
  ))}
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
            onChange={(e) => setInput({ ...input,[e.target.name]: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formThumbnail" className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) =>setFile(e.target.files[0])}
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
