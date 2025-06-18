import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("https://mern-project-main-pyk3.vercel.app/api/v1/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 fw-bold">Latest Posts</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {blogs.map((item) => (
            <Col key={item._id} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0 rounded-4 card-hover">
                <Card.Img
                  variant="top"
                  src={`https://mern-project-main-pyk3.vercel.app/${item.thumbnail}`}
                  alt={item.title}
                  style={{ height: "300px", objectFit: "cover" }}
                  className="rounded-top-4"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-semibold">{item.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ flex: 1 }}>
                    {item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description}
                  </Card.Text>
                  <Link
                    to={`/blog/${item._id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Read More
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
