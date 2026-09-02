import meter1 from "../../assets/img/configuration_9739435.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import colorSharp from "../../assets/img/color-sharp.png";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { jwtDecode } from "jwt-decode";

function Skills() {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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

  const fetchSkills = async () => {
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
        (item) => item.category === "skills"
      );

      if (filtered.length > 0) {
        setSkills(filtered[0].description);
      } else {
        setSkills([]);
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Error fetching skills. Please try again later.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2><br /><br /><br />

              {error && <p className="error-message">{error}</p>}

              {skills && skills.length > 0 ? (
                <Carousel
                  responsive={responsive}
                  className="owl-carousel owl-theme skill-slider wow zoomIn"
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                  containerClass="carousel-container-center"
                >
                  {skills.map((record, index) => (
                    <div className="item" key={index}>
                      <div>
                        <img src={meter1} alt="Skill image" />
                      </div>
                      <h5>{record}</h5>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <p>No skills data found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
}

export default Skills;
