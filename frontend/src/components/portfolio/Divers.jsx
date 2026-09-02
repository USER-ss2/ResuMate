import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

import colorSharp2 from "../../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";
import meter1 from "../../assets/img/pngwing.com.png";
import meter2 from "../../assets/img/hobby-6.svg";
import meter3 from "../../assets/img/dossier-de-certification.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import colorSharp from "../../assets/img/color-sharp.png";
import { jwtDecode } from "jwt-decode";

const Divers = () => {
  const [languages, setLanguages] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [certifs, setCertifs] = useState(null);
  const [error, setError] = useState(""); // Added error state

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

  const fetchHobbies = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/response/${userId}`
      );

      // Filter data based on the 'category' property
      const filtered = response.data.response.filter(
        (item) => item.category === "hobbies"
      );

      // Assuming the response format is suitable for setting directly
      setHobbies(filtered[0].description);
    } catch (err) {
      console.error("Error fetching hobbies:", err);
    }
  };
  const fetchLanguage = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/response/${userId}`
      );

      // Filter data based on the 'category' property
      const filteredLanguages = response.data.response.filter(
        (item) => item.category === "languages"
      );

      // Assuming the response format is suitable for setting directly
      setLanguages(filteredLanguages[0].description);
    } catch (err) {
      console.error("Error fetching languages:", err);
      setError("Failed to load languages data. Please try again later.");
    }
  };

  const fetchCertifs = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/certification/${userId}`
      );
      console.log(response.data.certifRecords)
      setCertifs(response.data.certifRecords);
    } catch (err) {
      console.error("Error fetching Certifications:", err);
    }
  };
  useEffect(() => {
    fetchLanguage();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="project" id="divers">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Divers</h2>
                  <br />
                  <br />
                  {error && <p className="error-message">{error}</p>}
                  <Tab.Container
                    id="projects-tabs"
                    defaultActiveKey="languages"
                  >
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="languages"
                          onClick={() => fetchLanguage()}
                        >
                          Languages
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="hobbies"
                          onClick={() => fetchHobbies()}
                        >
                          Hobbies
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="certifs"
                          onClick={() => fetchCertifs()}
                        >
                          Certifications
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="certifs">
                        {certifs && certifs.length > 0 ? (
                          <Carousel
                            responsive={responsive}
                            className="owl-carousel owl-theme skill-slider skill-bx wow zoomIn "
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                            itemClass="carousel-item-center"
                            containerClass="carousel-container-center"
                          >
                            {certifs.map((record, index) => (
                              <div
                                className="item justify-content-center"
                                key={index}
                              >
                                <div>
                                    <img src={meter3} alt="Image" />
                                    </div>
                                <h5>{record.certificationName}</h5>
                                <h6>{record.organizationName}</h6>
                                

                               <p>
                                  {record.issueDate.issueMonth}/{record.issueDate.issueYear} - {record.expirationDate.expirationMonth}/{record.issueDate.expirationYear}
                                </p>
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <p>No Certifications</p>
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="languages">
                        {languages && languages.length > 0 ? (
                          <Carousel
                            responsive={responsive}
                            
                            className="owl-carousel owl-theme skill-slider skill-bx wow zoomIn"
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                            containerClass="carousel-container-center"
                            
                          >
                            {languages.map((record, index) => (
                              <div className="item" key={index}>
                                <div>
                                    <img src={meter1} alt="Image" />
                                    </div>
                                <h5>{record}</h5>
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <p>No languages data found.</p>
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="hobbies">
                        {hobbies && hobbies.length > 0 ? (
                          <Carousel
                            responsive={responsive}
                            className="owl-carousel owl-theme skill-slider skill-bx wow zoomIn"
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                            containerClass="carousel-container-center"
                          >
                            {hobbies.map((record, index) => (
                              <div className="item" key={index}>
                                <div>
                                    <img src={meter2} alt="Image" />
                                    </div>
                                <h5>{record}</h5>
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <p>No hobbies data found.</p>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="Background"
      />
    </section>
  );
};

export default Divers;