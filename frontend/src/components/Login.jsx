import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

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
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors((prev) => ({ ...prev, email: "Invalid credentials" }));
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/Home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <nav className="nav">
        <h3>BlogApp</h3>
        <div className="sign-up">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </nav>

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

          <div className="btn">
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
