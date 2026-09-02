import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/images/Resumate.png";
import styles from "../styles/Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    try {
      // Get the token from localStorage
      const token = user.token;
      const email = user.email;

      console.log(token); // This will print the decoded token to the console

      // Decode the token
      const decodedToken = jwtDecode(token);
  
      // You can now access the user's information from the decoded token
      console.log(decodedToken); // This will print the decoded token to the console
  
      // For example, if the token contains user data, you can access it like this:
      const userId = decodedToken._id;
      const userEmail = email;
  
      console.log('User ID:', userId);
      console.log('User Email:', userEmail);
  
      // You can use the decoded information as needed in your application
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.log('No user token found in localStorage');
  }


  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("user");
    window.location = "/login"; // Redirect to login page
  };
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleLogoClick = () => {
    // If we're on the home page, scroll to the #home section
    if (location.pathname === "/") {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <>
      <Navbar
        expand="lg"
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to={location.pathname === "/login" ? "/" : "#home"}
            onClick={handleLogoClick}
            className={styles.navbarBrand}
          >
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.navbarNav}>
              <HashLink
                smooth
                to="/#home"
                className={`${styles.navItem} ${
                  activeLink === "home" ? styles.active : ""
                }`}
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </HashLink>
              <HashLink
                smooth
                to="/#about"
                className={`${styles.navItem} ${
                  activeLink === "about" ? styles.active : ""
                }`}
                onClick={() => onUpdateActiveLink("about")}
              >
                About
              </HashLink>
              <HashLink
                smooth
                to="/#features"
                className={`${styles.navItem} ${
                  activeLink === "features" ? styles.active : ""
                }`}
                onClick={() => onUpdateActiveLink("features")}
              >
                Why us?
              </HashLink>
              <HashLink
                smooth
                to="/#community"
                className={`${styles.navItem} ${
                  activeLink === "community" ? styles.active : ""
                }`}
                onClick={() => onUpdateActiveLink("community")}
              >
                Community
              </HashLink>
              <HashLink
                smooth
                to="/#contact"
                className={`${styles.navItem} ${
                  activeLink === "contact" ? styles.active : ""
                }`}
                onClick={() => onUpdateActiveLink("contact")}
              >
                Contact
              </HashLink>
              <div className={`${styles.logindiv}`}>
                {user ? (
                  <>
                    <NavDropdown
                      title={user.email}
                      id="basic-nav-dropdown"
                      className="navbar-link nav-link"
                    >
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={`navbar-link nav-link ${
                        activeLink === "login" ? "active" : ""
                      }`}
                      onClick={() => onUpdateActiveLink("login")}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={`navbar-link nav-link ${
                        activeLink === "signup" ? "active" : ""
                      }`}
                      onClick={() => onUpdateActiveLink("signup")}
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

