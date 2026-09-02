import React, { useEffect,useState } from "react";
import styles from "../styles/Home.module.css";
import {
  FaUserPlus,
  FaPalette,
  FaPenAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { addScrollAnimations } from "../js/animation";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

// Mettez le bon chemin
export const Home = () => {
  useEffect(() => {
    addScrollAnimations(); // Active les animations
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    try {
      // Get the token from localStorage
      const token = user.token;
      const email = user.email;

      console.log(token); // This will print the decoded token to the console

      // Decode the token
      const decodedToken = jwtDecode(token);

      // You can now access the user's information from the decoded token
      console.log(decodedToken); // This will print the decoded token to the console

      // For example, if the token contains user data, you can access it like this:
      const userId = decodedToken._id;
      const userEmail = email;

      console.log("User ID:", userId);
      console.log("User Email:", userEmail);

      // You can use the decoded information as needed in your application
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.log("No user token found in localStorage");
  }
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/Questions");
    } else {
      navigate("/login");
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_wyzbq7t',  // Replace with your service ID
        'template_bfrdmj9', // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'Sz_sinXDfJiUje3dT'    // Replace with your public key
      )
      .then(
        (result) => {
          alert('Email sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send the email. Please try again later.');
        }
      );
  };
  return (
    <div className={styles.home} id="home">
      {/* Section Hero */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className="wrapper">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={styles.overlay}></div>
        <h1 className={styles.greeting}>
          Welcome to <span>ResuMate</span>
        </h1>
        <p className={styles.description}>
          Create your perfect portfolio in just a few clicks!
        </p>
        <div className={styles.buttons}>
          <a>
            {" "}
            <button onClick={handleClick} className={styles.btnPrimary}>
              Create Your Own
            </button>
          </a>
          <a href="#about">
            <button className={styles.btnSecondary}>See More Details</button>
          </a>
        </div>
      </section>
      {/* Section About */}
      <section className={`${styles.section} ${styles.about} `} id="about">
        <div className={`${styles.title} animate-content`}>
          <h2>
            About <span>ResuMate</span>
          </h2>
        </div>
        <p className={`${styles.aboutDescription} animate-content`}>
          Resumate helps you create stunning portfolios effortlessly. Here's why
          you should choose us:
        </p>
        <div className={styles.reasons}>
          <div className={styles.reasonBox}>
            <h3>Easy to Use</h3>
            <p className={styles.reasonText}>
              Our platform is intuitive and user-friendly, designed for
              everyone.
            </p>
          </div>
          <div className={styles.reasonBox}>
            <h3>Customisable</h3>
            <p className={styles.reasonText}>
              Personalize your portfolio to reflect your unique style and needs.
            </p>
          </div>
          <div className={styles.reasonBox}>
            <h3>Professional Design</h3>
            <p className={styles.reasonText}>
              Create portfolios that impress with our sleek and professional
              templates.
            </p>
          </div>
          <div className={styles.reasonBox}>
            <h3>Secure & Reliable</h3>
            <p className={styles.reasonText}>
              Your data is safe with us. We ensure secure, cloud-based hosting.
            </p>
          </div>
        </div>
      </section>

      {/* Section Features (Guide) */}
      <section className={`${styles.section} ${styles.features}`} id="features">
        <div className={styles.featuresContainer}>
          <h2 className={`${styles.featuresTitle} animate-content`}>
            Explore <span>ResuMate</span>'s Features <br />
          </h2>
          <p className={`${styles.featuresIntro} animate-content`}>
            Discover how ResuMate empowers you to create, customize, and share
            your professional portfolio effortlessly.
          </p>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} animate-content`}>
              <FaUserPlus className={styles.featureIcon} />
              <h3>Create Your Profile</h3>
              <br />
              <p>
                Start by signing up and setting up your professional profile in
                minutes.
              </p>
            </div>
            <div className={`${styles.featureCard} animate-content`}>
              <FaPalette className={styles.featureIcon} />
              <h3>Choose a Template</h3>
              <br />
              <p>
                Select from a variety of beautifully crafted templates to match
                your style.
              </p>
            </div>
            <div className={`${styles.featureCard} animate-content`}>
              <FaPenAlt className={styles.featureIcon} />
              <h3>Customize Your Portfolio</h3>
              <br />
              <p>
                Add your projects, skills, and achievements to create a
                personalized portfolio.
              </p>
            </div>
            <div className={`${styles.featureCard} animate-content`}>
              <FaCloudUploadAlt className={styles.featureIcon} />
              <h3>Share Online</h3>
              <br />
              <p>
                Publish your portfolio online and share it with employers or
                clients effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Testimonials */}
      <section
        className={`${styles.section} ${styles.testimonials}`}
        id="community"
      >
        <div className="animate-content">
          <h2> Voices from our community </h2>
        </div>
        <div className={styles.testimonialCards}>
          <div className={styles.card}>
            <img
              src="../../src/assets/img/33.jpg"
              alt="User 1"
              className={styles.userPhoto}
            />
            <p className={styles.userName}>James Carter, 25</p>
            <p className={styles.userComment}>
              "As a computer science student, Resumate allowed me to quickly put
              together a professional portfolio to showcase my coding projects.
              It helped me land a summer internship with a top tech company!"
            </p>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          </div>
          <div className={styles.card}>
            <img
              src="../../src/assets/img/1.jpg"
              alt="User 2"
              className={styles.userPhoto}
            />
            <p className={styles.userName}>Emily Davis, 32</p>
            <p className={styles.userComment}>
              "ResuMate helped me create a portfolio that effectively showcases
              my project management skills. I received more calls for
              internships after I started using it."
            </p>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          </div>
          <div className={styles.card}>
            <img
              src="../../src/assets/img/hr.jpg"
              alt="User 3"
              className={styles.userPhoto}
            />
            <p className={styles.userName}>Rachel Green, Hiring Manager</p>
            <p className={styles.userComment}>
              "We've had students use ResuMate portfolios in our hiring process,
              and it has been a great way for us to evaluate both their
              technical skills and creativity. Highly recommend it!"
            </p>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          </div>
          <div className={styles.card}>
            <img
              src="../../src/assets/img/22.jpg"
              alt="User 4"
              className={styles.userPhoto}
            />
            <p className={styles.userName}>Sarah Walker, HR Manager</p>
            <p className={styles.userComment}>
              "As an HR manager, I've seen many portfolios, but ResuMate offers
              simplicity and style. The portfolios look professional, and I
              appreciate how easy it is for candidates to customize them."
            </p>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section
        className={`${styles.section} ${styles.contact} animate-section`}
        id="contact"
      >
        <div className="animate-content">
          <h2>Contact Us</h2>
          <p>If you need help, feel free to contact our team!</p>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" name="name" required value={formData.name}  onChange={handleChange}/>
          <input type="email" placeholder="Your Email" name="email" required value={formData.email} onChange={handleChange}/>
          <textarea placeholder="Your Message" rows="5" name="message" required value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" className={styles.btnPrimary}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};
export default Home;
