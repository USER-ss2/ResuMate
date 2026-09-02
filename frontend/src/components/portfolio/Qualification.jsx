import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Option() {
  const [academics, setAcademics] = useState([]);
  const [work, setWork] = useState([]);
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

          console.log("User ID:", userId);
          console.log("User Email:", userEmail);
          return userId;

          // You can use the decoded information as needed in your application
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.log("No user token found in localStorage");
      }
    } catch (err) {
      console.error("error decoding token", err);
      return null;
    }
  };

  const fetchAcademics = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/academic/${userId}`
      );
      setAcademics(response.data.academicRecords);
    } catch (err) {
      console.error("Error fetching academics:", err);
      setError("Failed to load academic records. Please try again later.");
    }
  };

  const fetchWork = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Invalid or missing token. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/work/${userId}`
      );
      setWork(response.data.workRecords);
      console.log(response.data.workRecords);
    } catch (err) {
      console.error("Error fetching work:", err);
      setError("Failed to load work records. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAcademics();
    fetchWork();
  }, []);

  return (
    <>
      <br />
      <br />
      <section className="timeline" id="qualifications">
        <h2 className="timeline__title">Education</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && academics.length === 0 && <p>Loading records...</p>}
        {academics.length > 0 && (
          <div className="timeline__container">
            {academics.map((record, index) => (
              <div className="timeline__item" key={index}>
                <div
                  className={`timeline__content ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                >
                  <h3>{record.fieldOfStudy}</h3>
                  <h4>{record.institutionName}</h4>
                  <br />
                  <p>{record.degreeType}</p>
                  <p>{record.location}</p>
                  <span className="timeline__date">
                    {record.startDate.month} / {record.startDate.year} -{" "}
                    {record.receiptDate.month} / {record.receiptDate.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <br />
        <br />

        {work.length > 0 && (
          <div>
            <h2 className="timeline__title">Experience</h2>
            <div className="timeline__container">
              {work.map((record, index) => (
                <div className="timeline__item" key={index}>
                  <div
                    className={`timeline__content ${
                      index % 2 === 0 ? "left" : "right"
                    }`}
                  >
                    <h3>{record.companyName}</h3>
                    <h4>{record.position}</h4>
                    <br />
                    <p>{record.location}</p>
                    <p style={{
                  wordWrap: "break-word", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  whiteSpace: "normal"}}>{record.responsibilities}</p>
                    <span className="timeline__date">
                      {record.startDate.month} / {record.startDate.year} -{" "}
                      {record.endDate.month} / {record.endDate.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Option;