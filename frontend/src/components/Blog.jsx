import React, { useEffect, useState } from "react";
import "../styles/Blog.css"; 
import Navbar from "./NavBar";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="blog-container">
        <h2>All Blogs</h2>
        <div className="blogs-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.image && <img src={blog.image} alt="Blog" />}
                <p>
                  <strong>Title:</strong> {blog.title}
                </p>
                <p>
                  <strong>Author:</strong> {blog.author}
                </p>
                <p> <strong>Content:</strong> {blog.content}</p>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
