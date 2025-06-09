import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default function(){
    return(
        <>
 <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Navbar.Brand href="/"> Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto text-white">
            <Nav.Link className="text-white" href="/">Home</Nav.Link>
            <Nav.Link className="text-white" href="/add-blog">Add Blog</Nav.Link>
            <Nav.Link className="text-white" href="/add-category">Add Category</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white" href="/login">Login</Nav.Link>
            <Nav.Link className="text-white" href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>        </>
    )
}