import { useEffect, useState } from "react";
import "../assets/styles/AddBlog.css";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../config';

const API_URL = `${BACKEND_URL}/posts`;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
    imageFile: null,
  });
  const [editId, setEditId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    const username = localStorage.getItem("username");
    setCurrentUser(username);
    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, category, imageFile } = formData;
    const author = currentUser;
    const token = localStorage.getItem("access_token");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("content", content);
      formDataToSend.append("category", category);
      formDataToSend.append("author", author);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to submit blog");

      if (editId) {
        toast.success("Blog updated successfully");
      } else {
        toast.success("Blog submitted successfully");
      }
      await fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Error submitting blog");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete blog");

      toast.success("Blog deleted successfully");
      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category || "",
      image: blog.image ? `${BACKEND_URL}${blog.image}` : null,
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
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file), imageFile: file }));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", category: "", image: "" });
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
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select from here</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="fashion">Fashion</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="news">News</option>
              <option value="other">Other</option>
            </select>
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
          </div>
          {formData.image && (
            <div className="image-preview-container">
              <img
                className="image-preview"
                src={formData.image}
                alt="Selected preview"
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {editId ? "Update Blog" : "Submit Blog"}
          </button>
        </form>

        <div className="blogs-list">
          <h3>Your Blogs</h3>
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => currentUser === blog.author)
              .map((blog) => (
                <div key={blog.id} className="blog-card">
                  {blog.image && (
                    <img src={`${BACKEND_URL}${blog.image}`} alt="Blog" />
                  )}
                  <p>
                    <strong>Title: </strong>
                    {blog.title}
                  </p>
                  <p>
                    <strong>Author: </strong>
                    {blog.author}
                  </p>
                  <p>
                    <strong>Content: </strong>
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
                  <div className="blog-actions">
                    {currentUser === blog.author && (
                      <>
                        <button onClick={() => handleEdit(blog)}>Edit</button>
                        <button onClick={() => handleDelete(blog.id)}>
                          Delete
                        </button>
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
