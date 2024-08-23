import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import EmpoyleeForm from '../form/empoyleeForm';
export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const path = location.pathname;
  return (
    <>
    <Navbar bg="light" expand="lg" className='py-3 fixed-top'>
    <Container>
        <Navbar.Brand >
        Employee Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav className="ml-auto ">
                <Button onClick={()=>setShowModal(true)} variant="primary">Add Employee</Button>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

<EmpoyleeForm showModal={showModal} setShowModal={setShowModal}/>
</>
  )
}
