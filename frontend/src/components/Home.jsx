
import React from "react";
import "../styles/Home.css";
import Navbar from "./NavBar";



function Home() {
  return (
    <>
      <Navbar/>
      <div className="main-container">
        <h2>Discovering Amazing</h2>
        <br />
        <h3>Stories & Blogs</h3>
        <p>
          Explore in-depth articles on web development, design, and technology
          from industry <br /> experts and passionate creators.
        </p>
        <div className="button">
          <a href="/Blog">
            <button>Start Reading</button>
          </a>
          <a href="">
            <button>Browse Categories</button>
          </a>
        </div>
      </div>

      {/* 2nd container */}
      <div className="second-container">
        <div className="first-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5c2acf"
          >
            <path d="M240-80q-50 0-85-35t-35-85v-560q0-50 35-85t85-35h440v640H240q-17 0-28.5 11.5T200-200q0 17 11.5 28.5T240-160h520v-640h80v720H240Zm120-240h240v-480H360v480Zm-80 0v-480h-40q-17 0-28.5 11.5T200-760v447q10-3 19.5-5t20.5-2h40Zm-80-480v487-487Z" />
          </svg>
          <p>
            50+ <br />
            Quality Articles
          </p>
        </div>
        <div className="second-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#EA3323"
          >
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
          </svg>
          <p>
            1K+ <br />
            Monthly Readers
          </p>
        </div>
        <div className="third-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#8C1AF6"
          >
            <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
          </svg>
          <p>
            5+ <br />
            Categories
          </p>
        </div>
      </div>

      {/* third container */}
      <div className="third-container">
        <h2>Latest Articles</h2>
        <p>Stay up to date with our newest content and insights.</p>
      </div>
    </>
  );
}

export default Home;
