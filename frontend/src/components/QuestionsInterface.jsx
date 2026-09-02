import React, { useState, useEffect } from "react";
import useSWR from "swr";
import "../styles/QuestionInterface.css";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const QuestionsInterface = () => {
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

  const userId = getUserIdFromToken();
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
  const [selectedOptions, setSelectedOptions] = useState([]); // Track selected options for checkboxes
  const [courseInput, setCourseInput] = useState(""); // Tracks the input value
  const [courses, setCourses] = useState([]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]); // State to store questions
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);

  //academics
  const [institutionName, setInstitutionName] = useState("");
  const [location, setLocation] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentlyStudying, setCurrentlyStudying] = useState(false);
  const [degreeType, setDegreeType] = useState("");
  const [receiptMonth, setReceiptMonth] = useState("");
  const [receiptYear, setReceiptYear] = useState("");

  //work
  const [companyName, setCompanyName] = useState("");
  const [locationwork, setLocationwork] = useState("");
  const [position, setPosition] = useState("");
  const [startMonthWork, setStartMonthWork] = useState("");
  const [startYearWork, setStartYearWork] = useState("");
  const [endMonthWork, setEndMonthWork] = useState("");
  const [endYearWork, setEndYearWork] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [responsibilities, setResponsibilities] = useState("");

  //certifications
  const [certificationName, setCertificationName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [issueMonth, setIssueMonth] = useState("");
  const [issueYear, setIssueYear] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [expiring, setexpiring] = useState(false);

  //projects
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [technologiesUsed, setTechnologiesUsed] = useState("");
  const [startMonthProject, setStartMonthProject] = useState("");
  const [startYearProject, setStartYearProject] = useState("");
  const [endMonthProject, setEndMonthProject] = useState("");
  const [endYearProject, setEndYearProject] = useState("");
  const [ongoing, setongoing] = useState(false);

  //exhibitions
  const [exhibitionName, setExhibitionName] = useState("");
  const [exhibitionLocation, setExhibitionLocation] = useState("");
  const [exhibitionTheme, setExhibitionTheme] = useState("");
  const [startMonthExhibition, setStartMonthExhibition] = useState("");
  const [startYearExhibition, setStartYearExhibition] = useState("");
  const [endMonthExhibition, setEndMonthExhibition] = useState("");
  const [endYearExhibition, setEndYearExhibition] = useState("");
  const [exhibitionDescription, setExhibitionDescription] = useState("");

  const handleSubmitAcademic = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const academicData = {
      userId,
      institutionName,
      location,
      fieldOfStudy,
      startDate: { month: startMonth, year: startYear },
      endDate: currentlyStudying
        ? "Present"
        : { month: endMonth, year: endYear },
      degreeType,
      receiptDate: { month: receiptMonth, year: receiptYear },
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5050/api/academic", // Remplacez par l'URL de votre API
        academicData
      );
      alert("School details added successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error saving school details:", err);
      alert("There was an error adding the school details.");
    }
  };

  const handleSubmitWork = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const workData = {
      userId,
      companyName,
      location: locationwork,
      position,
      startDate: { month: startMonthWork, year: startYearWork },
      endDate: currentlyWorking
        ? "Present"
        : { month: endMonthWork, year: endYearWork },
      responsibilities,
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5050/api/work", // Remplacez par l'URL de votre API
        workData
      );
      alert("Work details added successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error saving work details:", err);
      alert("There was an error adding the work details.");
    }
  };

  const handleSubmitCertifications = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const certificationsData = {
      userId,
      certificationName,
      organizationName,
      issueDate: { issueMonth, issueYear },
      expirationDate: expiring
        ? "Doesn't Expire"
        : { expirationMonth, expirationYear },
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5050/api/certification", // Remplacez par l'URL de votre API
        certificationsData
      );
      alert("Certifications details added successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error saving Certifications details:", err);
      alert("There was an error adding the Certifications details.");
    }
  };

  const handleSubmitProjects = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const projectData = {
      userId,
      projectName,
      projectDescription,
      technologiesUsed,
      startDate: { startMonthProject, startYearProject },
      endDate: ongoing ? "Ongoing" : { endMonthProject, endYearProject },
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5050/api/project", // Remplacez par l'URL de votre API
        projectData
      );
      alert("Project details added successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error saving project details:", err);
      alert("There was an error adding the project details.");
    }
  };

  const handleSubmitExhibitions = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const exhibitionData = {
      userId,
      exhibitionName,
      exhibitionLocation,
      exhibitionTheme,
      startDate: { startMonthExhibition, startYearExhibition },
      endDate: { endMonthExhibition, endYearExhibition },
      exhibitionDescription,
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        "http://localhost:5050/api/exhibition", // Remplacez par l'URL de votre API
        exhibitionData
      );
      alert("Exhibition details added successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error saving Exhibition details:", err);
      alert("There was an error adding the Exhibition details.");
    }
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!userId) {
        setError("User not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5050/api/question/${userId}`
        );
        setQuestions(response.data); // Set the fetched questions into state
        setLoading(false); // Set loading to false when done
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Error fetching questions");
        setLoading(false);
      }
    };

    fetchQuestions(); // Call the function to fetch the questions
  }, [userId]);

  const icons = {
    IT: "💻",
    Arts: "🎨",
    Journalism: "📰",
  };
  // Handles error and loading state
  if (error || loading || !questions || questions.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MagnifyingGlass
          height="80"
          width="80"
          color="#29008d"
          ariaLabel="loading"
        />
      </div>
    );

  const currentQuestion = questions[currentIndex];

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    const userId = getUserIdFromToken();
    let res;
    e.preventDefault();
    if (currentQuestion.inputType == "checkbox") {
      res = selectedOptions;
    } else if (currentQuestion.inputType === "radio" || currentQuestion.inputType === "textarea") {
      res = answer;
    }
    if (currentQuestion.category == "courses") {
      res = courses;
    }
    // Prepare the response data
    const responseData = {
      userId, // Assuming userId is passed as a prop
      category: currentQuestion.category, // Assuming the question has a category field
      description: res, // The answer the user typed in the textarea
    };

    try {
      const url = "http://localhost:5050/api/response"; // Replace with your backend API URL
      await axios.post(url, responseData);
      alert("Your answer has been submitted!");
      resetText();
      goToNextQuestion();
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("There was an error submitting your answer.");
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetSelection();
      resetCourses();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetSelection();
      resetCourses();
    }
  };
  const resetSelection = () => {
    setSelectedOptions([]);
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((opt) => opt !== value)
    );
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((selected) => selected !== option)
    );
    const checkbox = document.querySelector(
      `input[type='checkbox'][value='${option}']`
    );
    if (checkbox) {
      checkbox.checked = false;
      checkbox.parentElement.style.backgroundColor = "";
      checkbox.parentElement.style.color = "";
    }
  };

  const addCourse = () => {
    if (courseInput.trim() && !courses.includes(courseInput)) {
      setCourses([...courses, courseInput.trim()]);
      setCourseInput(""); // Clear the input
    }
  };

  const removeCourse = (course) => {
    setCourses(courses.filter((item) => item !== course));
  };
  const resetCourses = () => {
    setCourses([]); // Clear all courses
  };
  const renderQuestion = () => {
    switch (currentQuestion.field) {
    }
  };
  const resetText = () => {
    setAnswer(""); // Reset the textarea value
  };
  const renderInput = () => {
    switch (currentQuestion.inputType) {
      case "textarea":
        return (
          <div>
            <div className="form-floating">
              <textarea
                className="form-control"
                id="floatingTextarea"
                name={`question-${currentQuestion._id}`}
                placeholder="Type your detailed answer here"
                value={answer}
                onChange={handleChange}
              />
              <label htmlFor="floatingTextarea">Write your answer here</label>
            </div>
            <button className="Next submit" onClick={handleSubmit}>
              Submit answer
            </button>
          </div>
        );

      case "checkbox":
        return (
          <div>
            <div className="checkbox-question">
              <div className="container">
                <ul className="ks-cboxtags">
                  {currentQuestion.options.map((option, index) => (
                    <li
                      key={index}
                      className={
                        selectedOptions.includes(option) ? "ks-selected" : ""
                      }
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        name={`question-${currentQuestion._id}`}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={`checkbox-${index}`}>{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="Next submit" onClick={handleSubmit}>
              Submit answer
            </button>
          </div>
        );

        case "radio":
  return (
    <div>
      <div className="radio-question">
        <div className="container">
          <ul className="ks-cboxtags">
            {currentQuestion.options?.map((option, index) => (
              <li
                key={index}
              >
                <input
                  type="radio"
                  id={`radio-${currentQuestion._id}-${index}`}
                  name={`question-${currentQuestion._id}`}
                  value={option}
                  checked={answer === option}
                  onChange={handleChange}
                />

                <label
                  htmlFor={`radio-${currentQuestion._id}-${index}`}
                >
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="Next submit" onClick={handleSubmit}>
        Submit answer
      </button>
    </div>
  );

      case "select":
        return (
          <div className="custom-select-container">
            <select
              className="custom-select"
              name={`question-${currentQuestion._id}`}
            >
              <option value="" disabled>
                Select an option
              </option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>
                  {icons[option]} {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "form":
        switch (currentQuestion.category) {
          case "academic":
            return (
              <div className="form">
                <form className="row g-3" onSubmit={handleSubmitAcademic}>
                  <div className="col-md-6">
                    <label htmlFor="inputInstitution" className="form-label">
                      Institution Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputInstitution"
                      placeholder="Enter your institution name"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputLocation" className="form-label">
                      Location<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLocation"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputField" className="form-label">
                      Field of Study<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputField"
                      placeholder="Enter your Field of Study"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                    />
                  </div>
                  {/* Start Date */}
                  <div className="row">
                    <label htmlFor="inputStart" className="form-label">
                      Start Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputStartMonth"
                        className="form-select"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                      >
                        <option value="" disabled>
                          -Select One-
                        </option>
                        {/* Liste des mois */}
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputStartYear"
                        placeholder="Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* End Date */}
                  <div className="row">
                    <label htmlFor="inputEnd" className="form-label">
                      End Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputEndMonth"
                        className="form-select"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        disabled={currentlyStudying}
                      >
                        <option value="" disabled>
                          -Select One-
                        </option>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputEndYear"
                        placeholder="Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        disabled={currentlyStudying}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        checked={currentlyStudying}
                        onChange={(e) => setCurrentlyStudying(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        I currently study here
                      </label>
                    </div>
                  </div>
                  {/* Degree Type */}
                  <div className="col-12">
                    <label htmlFor="inputDegree" className="form-label">
                      Type of Degree<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputDegree"
                      placeholder="Enter your type of degree"
                      value={degreeType}
                      onChange={(e) => setDegreeType(e.target.value)}
                    />
                  </div>
                  {/* Date of Receipt */}
                  <div className="row">
                    <label htmlFor="inputReceipt" className="form-label">
                      Date of Receipt<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputReceiptMonth"
                        className="form-select"
                        value={receiptMonth}
                        onChange={(e) => setReceiptMonth(e.target.value)}
                      >
                        <option value="" disabled>
                          -Select One-
                        </option>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputReceiptYear"
                        placeholder="Year"
                        value={receiptYear}
                        onChange={(e) => setReceiptYear(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add School
                    </button>
                  </div>
                </form>
              </div>
            );
          case "courses":
            return (
              <div>
                <div className="coursesContainer">
                  <div className="courseInputSection">
                    <input
                      type="text"
                      placeholder="Type a course name..."
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCourse()}
                      className="courseInput"
                    />
                    <button onClick={addCourse} className="addButton">
                      Add
                    </button>
                  </div>
                  <div className="coursesBar">
                    {courses.map((course, index) => (
                      <div key={index} className="courseItem">
                        <span>{course}</span>
                        <button
                          className="removeButton"
                          onClick={() => removeCourse(course)}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="Next submit" onClick={handleSubmit}>
                  Submit answer
                </button>
              </div>
            );
          case "workExperience":
            return (
              <div className="form">
                <form className="row g-3" onSubmit={handleSubmitWork}>
                  <div className="col-md-6">
                    <label htmlFor="inputCompanyName" className="form-label">
                      Company Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCompanyName"
                      placeholder="Enter the company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputLocation" className="form-label">
                      Location<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLocation"
                      placeholder="Enter the location"
                      value={locationwork}
                      onChange={(e) => setLocationwork(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPosition" className="form-label">
                      Position<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPosition"
                      placeholder="Enter the job or internship title"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="inputStart" className="form-label">
                      Start Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputStartMonth"
                        className="form-select"
                        value={startMonthWork}
                        onChange={(e) => setStartMonthWork(e.target.value)}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputStartYear"
                        placeholder="Year"
                        value={startYearWork}
                        onChange={(e) => setStartYearWork(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="inputEnd" className="form-label">
                      End Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputEndMonth"
                        className="form-select"
                        value={endMonthWork}
                        onChange={(e) => setEndMonthWork(e.target.value)}
                        disabled={currentlyWorking}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputEndYear"
                        placeholder="Year"
                        value={endYearWork}
                        onChange={(e) => setEndYearWork(e.target.value)}
                        disabled={currentlyWorking}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="currentlyWorking"
                        checked={currentlyWorking}
                        onChange={(e) => setCurrentlyWorking(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="currentlyWorking"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inputResponsibilities"
                      className="form-label"
                    >
                      Responsibilities<span className="required">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="inputResponsibilities"
                      rows="4"
                      placeholder="List your key responsibilities"
                      value={responsibilities}
                      onChange={(e) => setResponsibilities(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add Experience
                    </button>
                  </div>
                </form>
              </div>
            );
          case "certifications":
            return (
              <div className="form">
                <form className="row g-3" onSubmit={handleSubmitCertifications}>
                  {/* Certification Name */}
                  <div className="col-md-6">
                    <label
                      htmlFor="inputCertificationName"
                      className="form-label"
                    >
                      Certification Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCertificationName"
                      placeholder="Enter the certification name"
                      value={certificationName}
                      onChange={(e) => setCertificationName(e.target.value)}
                    />
                  </div>

                  {/* Issuing Organization */}
                  <div className="col-md-6">
                    <label htmlFor="inputIssuer" className="form-label">
                      Issuing Organization<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputIssuer"
                      placeholder="Enter the issuing organization"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  </div>

                  {/* Issue Date */}
                  <div className="row">
                    <label htmlFor="inputIssueDate" className="form-label">
                      Issue Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputIssueMonth"
                        className="form-select"
                        value={issueMonth}
                        onChange={(e) => setIssueMonth(e.target.value)}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputIssueYear"
                        placeholder="Year"
                        value={issueYear}
                        onChange={(e) => setIssueYear(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <div className="row">
                    <label htmlFor="inputExpirationDate" className="form-label">
                      Expiration Date
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputExpirationMonth"
                        className="form-select"
                        value={expirationMonth}
                        onChange={(e) => setExpirationMonth(e.target.value)}
                        disabled={expiring}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputExpirationYear"
                        placeholder="Year"
                        value={expirationYear}
                        onChange={(e) => setExpirationYear(e.target.value)}
                        disabled={expiring}
                      />
                    </div>
                  </div>

                  {/* Checkbox for No Expiration */}
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="noExpiration"
                        checked={expiring}
                        onChange={(e) => setexpiring(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noExpiration"
                      >
                        This certification does not expire
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add Certification
                    </button>
                  </div>
                </form>
              </div>
            );
          case "projects":
            return (
              <div className="form">
                <form className="row g-3" onSubmit={handleSubmitProjects}>
                  {/* Project Name */}
                  <div className="col-md-12">
                    <label htmlFor="inputProjectName" className="form-label">
                      Project Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputProjectName"
                      placeholder="Enter the project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  {/* Project Description */}
                  <div className="col-md-12">
                    <label
                      htmlFor="inputProjectDescription"
                      className="form-label"
                    >
                      Project Description<span className="required">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="inputProjectDescription"
                      placeholder="Describe the project"
                      rows="4"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Technologies Used */}
                  <div className="col-md-12">
                    <label htmlFor="inputTechnologies" className="form-label">
                      Technologies Used<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTechnologies"
                      value={technologiesUsed}
                      onChange={(e) => setTechnologiesUsed(e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Separate technologies with commas.
                    </small>
                  </div>

                  {/* Start Date */}
                  <div className="row">
                    <label htmlFor="inputStartDate" className="form-label">
                      Start Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputStartMonth"
                        className="form-select"
                        value={startMonthProject}
                        onChange={(e) => setStartMonthProject(e.target.value)}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputStartYear"
                        placeholder="Year"
                        value={startYearProject}
                        onChange={(e) => setStartYearProject(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="row">
                    <label htmlFor="inputEndDate" className="form-label">
                      End Date
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputEndMonth"
                        className="form-select"
                        value={endMonthProject}
                        onChange={(e) => setEndMonthProject(e.target.value)}
                        disabled={ongoing}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputEndYear"
                        placeholder="Year"
                        value={endYearProject}
                        onChange={(e) => setEndYearProject(e.target.value)}
                        disabled={ongoing}
                      />
                    </div>
                  </div>

                  {/* Ongoing Checkbox */}
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isOngoing"
                        checked={ongoing}
                        onChange={(e) => setongoing(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="isOngoing">
                        This project is ongoing
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add Project
                    </button>
                  </div>
                </form>
              </div>
            );
          case "exhibitions":
            return (
              <div className="form">
                <form className="row g-3" onSubmit={handleSubmitExhibitions}>
                  {/* Exhibition Name */}
                  <div className="col-md-6">
                    <label htmlFor="inputExhibitionName" className="form-label">
                      Exhibition Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputExhibitionName"
                      placeholder="Enter the exhibition name"
                      value={exhibitionName}
                      onChange={(e) => setExhibitionName(e.target.value)}
                    />
                  </div>

                  {/* Exhibition Location */}
                  <div className="col-md-6">
                    <label
                      htmlFor="inputExhibitionLocation"
                      className="form-label"
                    >
                      Location<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputExhibitionLocation"
                      placeholder="Enter the location"
                      value={exhibitionLocation}
                      onChange={(e) => setExhibitionLocation(e.target.value)}
                    />
                  </div>

                  {/* Exhibition Theme */}
                  <div className="col-md-12">
                    <label
                      htmlFor="inputExhibitionTheme"
                      className="form-label"
                    >
                      Theme<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputExhibitionTheme"
                      placeholder="E.g., Contemporary Art, Abstract Designs"
                      value={exhibitionTheme}
                      onChange={(e) => setExhibitionTheme(e.target.value)}
                    />
                  </div>

                  {/* Start Date */}
                  <div className="row">
                    <label
                      htmlFor="inputExhibitionStart"
                      className="form-label"
                    >
                      Start Date<span className="required">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputExhibitionStartMonth"
                        className="form-select"
                        value={startMonthExhibition}
                        onChange={(e) =>
                          setStartMonthExhibition(e.target.value)
                        }
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputExhibitionStartYear"
                        placeholder="Year"
                        value={startYearExhibition}
                        onChange={(e) => setStartYearExhibition(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="row">
                    <label htmlFor="inputExhibitionEnd" className="form-label">
                      End Date
                    </label>
                    <div className="col-md-8">
                      <select
                        id="inputExhibitionEndMonth"
                        className="form-select"
                        value={endMonthExhibition}
                        onChange={(e) => setEndMonthExhibition(e.target.value)}
                      >
                        <option defaultValue="-Select One-" disabled>
                          -Select One-
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        id="inputExhibitionEndYear"
                        placeholder="Year"
                        value={endYear}
                        onChange={(e) => setEndYearExhibition(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Exhibition Description */}
                  <div className="col-md-12">
                    <label
                      htmlFor="inputExhibitionDescription"
                      className="form-label"
                    >
                      Description<span className="required">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="inputExhibitionDescription"
                      placeholder="Describe the exhibition"
                      rows="4"
                      value={exhibitionDescription}
                      onChange={(e) => setExhibitionDescription(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Add Exhibition
                    </button>
                  </div>
                </form>
              </div>
            );
        }
      default:
        return <p>Unsupported input type</p>;
    }
  };
  return (
    <div className="questionsContainer">
      <h1 className="cursor typewriter-animation">
        Help us get to know you more!
      </h1>
      <div className="question">
        <strong> {currentQuestion.questionText}</strong>
        <br />
        {renderInput()}
        <br />
        {currentQuestion.options && currentQuestion.options.length > 0 && <></>}
      </div>
      <div className="navigation-buttons">
        <button onClick={goToPreviousQuestion} disabled={currentIndex === 0} className="Next">
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          // Render the Next button for all but the last question
          <button
            className="Next"
            onClick={goToNextQuestion}
            disabled={false} // Allow clicking unless you have other conditions
          >
            Next
          </button>
        ) : (
          // Render the Submit button for the last question
          <button
            className="Next"
            onClick={() => {
              window.open("/portfolio", "_blank"); // Open the portfolio page in a new tab
            }}
          >
            Check Your Portfolio
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionsInterface;
