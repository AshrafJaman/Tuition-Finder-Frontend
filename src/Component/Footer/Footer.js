import React from "react";
import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-distributed">
      <div className="footer-left">
        <h3>
          Tution<span>Finder</span>
        </h3>

        <p className="footer-links">
          <Link to="/">Home</Link>
          <br />
          <Link to="/blog">Blog</Link>
          <br />
          <a href="/home/#contact">Contact Us</a>
          <br />
          <Link to="/about">About Us</Link>
        </p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Metropolitan University</span> Bateshwar, Sylhet, Bangladesh
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+880 303987654</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:ashrafjaman247@gmail.com">info@tutionfinder.com</a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About Tution Finder</span>
          MATCHING STUDENTS WITH THE BEST TUTORS
          <br />
          -Website Developed by Ashraf & Navid-
        </p>

        <div className="footer-icons">
        <p> Follow US On</p>
        <br/>
          <a href="#">
            <FacebookIcon></FacebookIcon>
          </a>
          <a href="#">
            <TwitterIcon></TwitterIcon>
          </a>
          <a href="#">
            <LinkedInIcon></LinkedInIcon>
          </a>
          <a href="#">
            <GitHubIcon></GitHubIcon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
