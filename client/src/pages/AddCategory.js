import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate(); // ✅ call the hook
  const [input, setInput] = useState({
    title: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://mern-project-main-pyk3.vercel.app/api/v1/add/category", 
        input,
      {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }
  
      );
      alert(res.data.message);
      navigate("/"); // ✅ will now work
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Add a New Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title" // ✅ needed for onChange
            placeholder="Enter Title name"
            value={input.title}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Add Category
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCategory;
