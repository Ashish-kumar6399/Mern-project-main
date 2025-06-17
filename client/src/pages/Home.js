import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
   const [blogs,setBlogs] =useState([]);
  useEffect(()=>{
    const fetchAllBlogs =async () =>{
      const res =await axios.get("http://localhost:9000/api/v1/get/allblogs",{
         headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
         }
      } );
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, [])

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Latest posts</h2>
      <Row className="justify-content-center">
        { blogs && blogs.length > 0 ?

        blogs.map((item) =>{
          return(
               <Col md={4}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={`http://localhost:9000${item.thumbnail}`}
              alt="Post Avatar"
              style={{ padding: "30px", objectFit: "contain", height: "200px" }}
            />
            <Card.Body className="text-center">
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
<Link to={`/blog/${item._id}`} className="btn btn-primary">Read More</Link>
            </Card.Body>
          </Card>  
        </Col>
          );
        })
        
        :<h2>Loading</h2>}
       
      </Row>
    </Container>
  );
};

export default Home;
