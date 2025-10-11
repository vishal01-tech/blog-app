import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
import { BACKEND_URL } from '../config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setRedirecting(true);
      navigate("/");
    }
  }, [navigate]);

  if (redirecting) {
    return <p>Redirecting...</p>;
  }

  // Validation logic
  const validateField = (value, field) => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Invalid email format.";
        }
        break;
      case "password":
        if (!value.trim()) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    // Clear error while typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (e, field) => {
    const value = e.target.value;
    const error = validateField(value, field);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField(email, "email");
    const passwordError = validateField(password, "password");

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // Stop submission if there are any validation errors
    if (emailError || passwordError) return;

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const errorData = await response.json();
          if (errorData.detail === "Invalid email") {
            toast.error("Email is wrong");
          } else if (errorData.detail === "Invalid password") {
            toast.error("Password is wrong");
          } else {
            toast.error("Invalid credentials");
          }
          setErrors((prev) => ({ ...prev, email: "Invalid credentials" }));
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
     <Navbar/>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
              onBlur={(e) => handleBlur(e, "email")}
              
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
              onBlur={(e) => handleBlur(e, "password")}
            
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="logout-btn">
            <button type="submit">Log In</button>
          </div>

          <Link to="/forgotpassword">
            <p className="forgot-button">Forgot Password?</p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
