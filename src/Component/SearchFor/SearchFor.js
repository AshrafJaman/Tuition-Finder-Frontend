import { Button } from "@material-ui/core";
import React from "react";
import "./SearchFor.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link } from "react-router-dom";
import searchtutor from "../../image/searchtutor.jpg";
const SearchFor = () => {
  return (
    <div className="searchFor">
      <div>
        <h2>Tutors</h2>
        <p>Let's see who is waiting For you!</p>
      </div>
      <div>
        <div>
          <img src={searchtutor} alt="" />
        </div>
        <div>
          <h2>Find Expert Tutor</h2>
          <h3>Get instant Solutions</h3>
          <div>
            <Link to="/subject/math">
              <Button>
                Math <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/physics">
              <Button>
                Physics <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/english">
              <Button>
                English <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/science">
              <Button>
                Science <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/business">
              <Button>
                Business <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/more-subject">
              <Button variant="outlined" color="primary">
                View More Subjects.
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFor;
