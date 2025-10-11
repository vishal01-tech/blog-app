import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/NavBar.css";
import { toast } from 'react-toastify';



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h3>BlogApp</h3>
      <div className="links">
        <Link to="/">Home</Link>

        {isLoggedIn && <Link to="/blogpage">Add Blog</Link>}
        <Link to="/blog">Blog</Link>
        <a href="/categories">Categories</a>
      </div>
      <div className="log">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="log-btn">
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
