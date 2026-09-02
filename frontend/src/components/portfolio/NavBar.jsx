import {useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import CV from "../../assets/John-Cv.pdf"
import 'bootstrap/dist/css/bootstrap.min.css'; 

import logo from '../../assets/img/logo.png';

function NavBar(){
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50){
        setScrolled(true);

      }else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
    return (
        
      <>

    <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
      <Container>
        <Navbar.Brand href="#home">
        <img src={logo} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')} >Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')} >Skills</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')} >Projects</Nav.Link>
            <Nav.Link href="#qualifications"className={activeLink === 'option' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('qualifications')}>Qualifications</Nav.Link>
            <Nav.Link href="#divers"className={activeLink === 'divers' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Divers')}>Divers</Nav.Link>

            <Nav.Link href="#contact"className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link>


          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
}

        

export default NavBar