import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Register.css";
import Navbar from "./NavBar";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = "";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (name) {
      case "username":
        if (!value.trim()) message = "Username is required.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (!emailRegex.test(value)) message = "Invalid email format.";
        break;
      case "password":
        if (!value.trim()) message = "Password is required.";
        else if (value.length < 6)
          message = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    const fieldNames = ["username", "email", "password"];
    const newErrors = {};

    fieldNames.forEach((field) => {
      validateField(field, formData[field]);
      if (formData[field].trim() === "" || errors[field]) {
        newErrors[field] = errors[field] || "This field is required.";
      }
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User created successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/"); // Redirect to login
      } else {
        alert(result.detail || "Signup failed.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-form">
      <Navbar />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>
            Username <span>*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>
            Email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>
            Password <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="button">
          <button type="submit" className="button">
            Create Account
          </button>
        </div>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
