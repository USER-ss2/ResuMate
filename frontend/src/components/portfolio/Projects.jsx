import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExhibitionCard } from "./ExhibitionCard";
import { jwtDecode } from "jwt-decode";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [exhibitions, setExhibitions] = useState([]);

  const getUserIdFromToken = () => {
    try {
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
          return userId;

          // You can use the decoded information as needed in your application
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.log('No user token found in localStorage');
      }
    } catch (err) {
      console.error("error decoding token", err);
      return null;
    }
  };

  const fetchProjects = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5050/api/project/${userId}`);
      setProjects(response.data.projectRecords);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects records. Please try again later.");
    }
  };

  const fetchExhibitions = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5050/api/exhibition/${userId}`);
      setExhibitions(response.data.exhibitionRecords);
    } catch (err) {
      console.error("Error fetching exhibitions:", err);
      setError("Failed to load exhibitions records. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchExhibitions();
  }, []);

  // Return null if no projects and no error
  if (projects.length === 0) return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Exhibitions</h2>
                  <br />
                  <br />
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {exhibitions.length > 0 && (
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first">
                          <Row className="justify-content-center">
                            {exhibitions.map((record, index) => (
                              <ExhibitionCard key={index} {...record} />
                            ))}
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    )}
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background decoration" />
    </section>
  );else
  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <br />
                  <br />
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {projects.length > 0 && (
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first">
                          <Row className="justify-content-center">
                            {projects.map((record, index) => (
                              <ProjectCard key={index} {...record} />
                            ))}
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    )}
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background decoration" />
    </section>
  );
};

export default Projects;