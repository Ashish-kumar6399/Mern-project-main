import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const AddCategory = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., send to API)
    console.log("Category Title:", title);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Add a New Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
//         