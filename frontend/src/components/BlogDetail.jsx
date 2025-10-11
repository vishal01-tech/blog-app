import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import Navbar from "./NavBar";
import "../assets/styles/BlogDetail.css";


const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch blog");
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Error fetching blog");
    }
  };

  if (!blog) {
    return (
      <>
        <Navbar />
        <p>Loading blog...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="blog-detail-container">
        <h2>{blog.title}</h2>
        <p><strong>Author:</strong> {blog.author}</p>
        {blog.image && <img src={`${BACKEND_URL}${blog.image}`} alt="Blog" />}
        <p>{blog.content}</p>
      </div>
    </>
  );
};

export default BlogDetail;
