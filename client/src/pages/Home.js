import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Home = () => {
   const [blogs,setBlogs] =useState([]);
  useEffect(()=>{
    const fetchAllBlogs =async () =>{
      consr 
    };
    fetchAllBlogs();
  }, [])

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Latest posts</h2>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/194/194935.png"
              alt="Post Avatar"
              style={{ padding: "30px", objectFit: "contain", height: "200px" }}
            />
            <Card.Body className="text-center">
              <Card.Title>Demo</Card.Title>
              <Card.Text>Demo Content</Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
