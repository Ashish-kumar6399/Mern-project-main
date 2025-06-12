import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Register = () => {

  const navigate = useNavigate();

  const [input,setInput] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post("http://localhost:9000/api/v1/user/register", input);
      alert(res.data.message || "Registration successful");
             navigate("/login");    

    } catch (error) {
       alert(error.response.data.message || "Registration failed");  
    }
  };
 

  

  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up Here</h2>
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="username"
                value={input.username}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                 value={input.email}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
               
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                 value={input.password}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
               
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
