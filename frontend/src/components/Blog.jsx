import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Blog.css";
import Navbar from "./NavBar";
import { BACKEND_URL } from '../config';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/posts`);
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
                {blog.image && (
                  <img src={`${BACKEND_URL}${blog.image}`} alt="Blog" />
                )}
                <p>
                  <strong>Title:</strong> {blog.title}
                </p>
                <p>
                  <strong>Author:</strong> {blog.author}
                </p>
                <p><strong>Category:</strong>
                  {blog.category }</p>
                <p>
                <strong>Content:</strong>{" "}
                  <p>
                    {" "}
                    {blog.content.length > 30 ? (
                      <>
                        {blog.content.substring(0, 30)}...
                        <button
                          className="read-more-btn"
                          onClick={() => navigate(`/blog/${blog.id}`)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      blog.content
                    )}
                  </p>
                </p>
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
