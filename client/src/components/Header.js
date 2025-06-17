import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto">
            <Nav.Link className="text-white" href="/home">Home</Nav.Link>
            <Nav.Link className="text-white" href="/add-blog">Add Blog</Nav.Link>
            <Nav.Link className="text-white" href="/add-category">Add Category</Nav.Link>
          </Nav>

          <Nav>
            {token ? (
              <>
                <Nav.Link className="text-white" href="/profile">
                  {username ? `Welcome, ${username}` : "Profile"}
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-white" href="/login">Login</Nav.Link>
                <Nav.Link className="text-white" href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
