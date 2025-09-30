
import React from "react";
import '../styles/NavBar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>BlogApp</h3>
      <div className="links">
        <a href="/home">Home</a>
        <a href="/blog">Blog</a>
        <a href="/BlogPage">Add Blog</a>
        <a href="/categories">Categories</a>
      </div>
      <div className="log">
        <a href="/">Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
