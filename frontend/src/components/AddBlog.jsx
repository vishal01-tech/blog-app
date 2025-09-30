import React, { useEffect, useState } from "react";
import "../styles/BlogPage.css";
import Navbar from "./NavBar";

const API_URL = "http://localhost:8000/posts";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setCurrentUser(username);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image } = formData;
    const author = currentUser || formData.author;
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author, image }),
      });

      if (!response.ok) throw new Error("Failed to submit blog");

      await fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete blog");

      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: blog.image,
    });
    setEditId(blog.id);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", author: "", image: "" });
    setEditId(null);
  };

  return (
    <>
      <Navbar />
      <div className="blog-container">
        <h2>{editId ? "Edit Blog" : "Write Your Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Author field hidden or disabled since author is current user */}
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              // value={currentUser || formData.author}
              // disabled
              placeholder="Author name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here"
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Choose Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.image && (
              <img src={formData.image} alt="Selected preview" />
            )}
          </div>

          <button type="submit" className="submit-btn">
            {editId ? "Update Blog" : "Submit Blog"}
          </button>
        </form>

        <div className="blogs-list">
          <h3>Your Blogs</h3>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.image && <img src={blog.image} alt="Blog" />}
                <p>
                  <strong>Title: </strong>
                  {blog.title}
                </p>
                <p>
                  <strong>Author: </strong> {blog.author}
                </p>
                <p>
                  <strong>Content: </strong> {blog.content}
                </p>
                <div className="blog-actions">
                  {currentUser === blog.author && (
                    <>
                      <button onClick={() => handleEdit(blog)}>Edit</button>
                      <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No blogs posted yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
