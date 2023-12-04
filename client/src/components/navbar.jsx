import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';  
import { BrowserRouter, Routes,Route, Link } from "react-router-dom"
import { Login } from '../pages/adminLogin';
import App from '../App';

function NavbarExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">e-commerce application</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/landing">Home</Nav.Link>
            <Nav.Link href="#Categories">Categories</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

<BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<Login/>}/>
        <Route index element={<App/>}/>
        <Route path="/landing" element={<App/>}/>
        
      </Routes>
</BrowserRouter>
    </>
  );
}


export default NavbarExample;