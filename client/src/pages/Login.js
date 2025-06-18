import React, { use, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const Login = () => {
  const Navigate =useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-project-main-pyk3.vercel.app/api/v1/user/login", input); 
    alert(res.data.message || "Login successful");
    localStorage.setItem("token", res.data.token);
    // localStorage.setItem("username", res.data.username);
    localStorage.setItem("username", res.data.name);

    Navigate("/home");
    console.log(res.data);
  }catch (error) {
      alert(error.response.data.message || "Login failed");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Log into Your Account</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={input.email}
                onChange={(e) =>setInput({...input,[e.target.name]: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                  value={input.password}
                onChange={(e) =>setInput({...input,[e.target.name]: e.target.value})}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
