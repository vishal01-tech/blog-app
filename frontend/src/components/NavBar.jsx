
import React from "react";
import '../styles/NavBar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>BlogApp</h3>
      <a href="/home">Home</a>
      <a href="/blog">Blog</a>
      <a href="/BlogPage">Add Blog</a>
      <a href="/categories">Categories</a>
      <a href="/About">About</a>
      <input type="search" placeholder="Search" />
      <button>Search</button>
      <a href="/">LogOut</a>
    </nav>
  );
};

export default Navbar;
