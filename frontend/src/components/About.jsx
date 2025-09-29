import React from "react";
import Navbar from "./NavBar";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h2>About This Page</h2>
        <p>
          Welcome to our blog platform! 🎉 This is a space where users can share <br />
          their thoughts, ideas, experiences, or anything they're passionate
          about.
        </p>

        <p>
          Our mission is to empower creativity through writing. Whether you're a
          casual writer or a seasoned blogger, you're welcome here.
        </p>

        <h3>Features:</h3>
        <ul>
          <li>Write and edit blog posts</li>
          <li>Upload images with your posts</li>
          <li>View blogs shared by others</li>
          <li>Fast and easy-to-use interface</li>
        </ul>

        <h3>About the Developer</h3>
        <p>
          This project was built using <strong>React</strong> on the frontend
          and <strong>FastAPI</strong> on the backend.
        </p>
        <p>
          Want to contribute or give feedback? Feel free to reach out or check
          out the code on GitHub!
        </p>
      </div>
    </>
  );
};

export default AboutPage;
