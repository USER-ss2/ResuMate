import "../styles/Login.css";
import contactImg from "../assets/images/contact-img.svg";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, birthDate, email, password, address,field);
    navigate("/login");
  };
  const icons = {
    IT: "💻",
    Arts: "🎨",
    Journalism: "📰",
  };
  return (
    <div className="overlay1">
      <div className="box1">
        <div className="right">
          <img src={contactImg} alt="Sign up illustration" className="img" />
        </div>
        <div className="left">
          <form
            className="signup container mt-4"
            onSubmit={handleSubmit}
            style={{ maxWidth: "500px" }}
          >
            <h2 className="text-center mb-4" style={{ color: "white" }}>
              Sign Up
            </h2>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label"></label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label"></label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="mb-3">
              <select
                className="custom-select"
                value={field}
                onChange={(e) => setField(e.target.value)} // Update the state with selected value
                required
              >
                <option value="" disabled>
                  Select a field
                </option>
                <option value="IT">{icons.IT}IT</option>
                <option value="Journalism">{icons.Journalism}Journalism</option>
                <option value="Arts">{icons.Arts}Arts</option>
              </select>
            </div>

            <button disabled={isLoading} className="btn btn-light w-100">
              Create Account
            </button>

            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
