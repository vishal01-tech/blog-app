import "../assets/styles/AboutPage.css";


const AboutPage = () => {
  return (
    <>
      <div className="about-container">
        <div className="first">
          <h2>BlogApp</h2>
          <p>
            Welcome to our blog platform! This is a space where users can share
            their thoughts, ideas, experiences, or anything they're passionate
            about.
          </p>
        </div>
        <div className="second">
          <h2> | Links</h2>
          <a href="">Home</a>
          <a href="">Get Started</a>
          <a href="">Services</a>
          <a href="">Portfolio</a>
        </div>
        <div className="third">
          <h2>| Others</h2>
          <a href="">Terms of Service</a>
          <a href="">Privacy Policy</a>
          <a href="">Terms of Service</a>
          <a href="">Terms of Service</a>
        </div>
        <div className="fourth">
          <h2>| Others</h2>
          <h3>Follow us on Social Media</h3>
          <a href="" className="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="35"
              height="35"
              role="img"
              aria-label="Instagram"
            >
              <title>Instagram</title>
              <path
                fill="red"
                d="M224 202.7c-35.1 0-63.6 28.4-63.6 63.6S188.9 330 224 330s63.6-28.4 63.6-63.6S259.1 202.7 224 202.7zm0-42.7c58.8 0 106.4 47.6 106.4 106.4S282.8 372.8 224 372.8 117.6 325.2 117.6 266.4 165.2 160 224 160zm138.4-46.9c0 10-8.1 18.1-18.1 18.1s-18.1-8.1-18.1-18.1 8.1-18.1 18.1-18.1 18.1 8.1 18.1 18.1zM448 144v224c0 79.5-64.5 144-144 144H144C64.5 512 0 447.5 0 368V144C0 64.5 64.5 0 144 0h160c79.5 0 144 64.5 144 144zM400 144c0-53-43-96-96-96H144c-53 0-96 43-96 96v224c0 53 43 96 96 96h160c53 0 96-43 96-96V144z"
              />
            </svg>
          </a>
          <a href="" className="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="35"
              height="35"
              role="img"
              aria-label="Facebook"
            >
              <title>Facebook</title>
              <path
                fill="#1877F2"
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
              />
            </svg>
          </a>
          <a href="" className="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="35"
                  height="35"
                  role="img"
                  aria-label="LinkedIn"
                >
                  <title>LinkedIn</title>
                  <path
                    fill="#0A66C2"
                    d="M100.28 448H7.4V148.9h92.88V448zM53.79 108.1C24.09 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.79 0c29.69 0 53.8 24.1 53.8 53.8 0 29.7-24.11 54.3-53.8 54.3zM447.9 448h-92.4V302.4c0-34.7-.7-79.2-48.2-79.2-48.2 0-55.6 37.7-55.6 76.6V448h-92.5V148.9h88.8v40.9h1.3c12.3-23.4 42.3-48.2 87.1-48.2 93.2 0 110.4 61.4 110.4 141.3V448z"
                  />
                </svg>
            </a>
          <a href="" className="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="35"
              height="35"
              role="img"
              aria-label="YouTube"
            >
              <title>YouTube</title>
              <path
                fill="#FF0000"
                d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C458.8 64 288 64 288 64s-170.8 0-213.1 10.9c-23.7 6.3-42.3 24.9-48.6 48.6C16.4 166.4 16.4 256 16.4 256s0 89.6 9.9 131.9c6.3 23.7 24.9 42.3 48.6 48.6C117.2 448 288 448 288 448s170.8 0 213.1-10.9c23.7-6.3 42.3-24.9 48.6-48.6 9.9-42.3 9.9-131.9 9.9-131.9s0-89.6-9.9-131.9z"
              />
              <path
                fill="#FFFFFF"
                d="M232 338.5v-165l142 82.5-142 82.5z"
              />
            </svg>
            </a>
        </div>
        <div className="fifth">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            role="img"
            aria-label="Copyright symbol"
          >
            <title>Copyright</title>
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M15.5 9.5a4 4 0 0 0-7 2.5 4 4 0 0 0 7 2.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h2>BlogApp. All Rights Reserved</h2>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
