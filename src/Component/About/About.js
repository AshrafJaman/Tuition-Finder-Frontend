import React from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import "./About.css";
import about from "../../image/about.jpeg";
const About = () => {
  return (
    <div className="about">
      <div>
        <Navigation></Navigation>
      </div>
      <div>
        <h3>About Us</h3>
      </div>
      <div>
        <img src={about} alt="" />
      </div>
      <div>
        <h2>
          Tuition Finder is an online platform to connect students and teachers.
        </h2>
        <p>
          Many students and guardians face problems when finding a good teacher.
          Usually because they don’t know many teachers or they don’t have the
          contact of teachers. Similarly, many teachers can’t find students to
          teach because they also don’t have their contact.{" "}
        </p>
        <p>
          This is a very common problem. Tuition Finder platform aims to solve
          this exact problem.{" "}
        </p>
        <p>
          In this platform, students and teachers can easily find each other by
          searching and posting and make contact. Students can search for a
          tutor by subject, university or college.{" "}
        </p>
        <p>
          Also, the teacher can post a job listing with their requirements. If
          the student finds any suitable tutor then they can contact directly
          with the teacher.
        </p>
        <p>
          This platform also has a blog section where registered users can
          publish helpful articles. There is also a feature rich admin dashboard
          from where admin can moderate what happens on the platform.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
