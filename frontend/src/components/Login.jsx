import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/Login.css";
import contactImg from "../assets/images/contact-img.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();

	  await login(email, password);
	  navigate('/');
  };

  return (
    <div className="overlay1">
      <div className="box1">
        <div>
          <img src={contactImg} alt="Sign up illustration" className="img1" />
        </div>
        <div>
          <form className="login container mt-4" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4" style={{ color: "white" }}>
              Login
            </h2>

            <div className="mb-3">
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

            <button disabled={isLoading} className="btn btn-light">
              Login
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
