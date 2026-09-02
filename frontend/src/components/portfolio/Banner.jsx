import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import TrackVisibility from "react-on-screen";
import about from "../../assets/img/about.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [personal, setPersonal] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

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

  const fetchUsername = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/user/${userId}` // Update this endpoint based on your API
      );
      setUsername(response.data.user.firstName || "Guest"); // Use a fallback in case username is not available
    } catch (err) {
      console.error("Error fetching username:", err);
      setError("Failed to load username. Please try again later.");
    }
  };

  const fetchPersonal = async () => {
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
      const filteredPersonal = response.data.response.filter(
        (item) => item.category === "personal statement"
      );
      setPersonal(filteredPersonal[0]?.description || []);
    } catch (err) {
      console.error("Error fetching personal:", err);
      setError("Failed to load personal data. Please try again later.");
    }
  };

  const fetchProfessional = async () => {
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
      const filteredProfessional = response.data.response.filter(
        (item) => item.category === "professional"
      );
      setProfessional(filteredProfessional[0]?.description || []);
    } catch (err) {
      console.error("Error fetching professional data:", err);
      setError("Failed to load professional data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPersonal();
    fetchProfessional();
  }, []);

  // Set `toRotate` based on the fetched `professional` data
  const toRotate = professional.length > 0 ? professional : ["Web Developer", "Web Designer", "UI/UX Designer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <div>
        <Row className="align-items-center">
          
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={isVisible ? "animate__animated animate__fadeIn" : ""}
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`I'm passionate about `}{" "}
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <div>
                    {personal.length > 0 ? (
                      personal.map((record, index) => (
                        <p key={index}>{record}</p>
                      ))
                    ) : (
                      <p>No personal data found.</p>
                    )}
                  </div>
                  <a href="#contact">
                    Let’s Connect <ArrowRightCircle size={25} />
                  </a>
                </div>
              )}
            </TrackVisibility>
          
          
        </Row>
      </div>
    </section>
  );
}

export default Banner;
