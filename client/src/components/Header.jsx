import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "../components/Logo.jpg";

function OffcanvasExample() {
  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <div className="me-4"> {/* Add margin to the right */}
            <img src={Logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
          </div>
          <Navbar.Brand href="#" style={{ fontSize: '2rem' }}>ScoreCaster</Navbar.Brand>
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                ScoreCaster
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">
              Home
              </Nav.Link>

                <Nav.Link href="./AuditTemplates">
                Templates
                </Nav.Link>

                <Nav.Link href="#action6">
                  Completed Scorecards
                </Nav.Link>
                <Nav.Link href="#action7">
                  Create New Scorecard
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
