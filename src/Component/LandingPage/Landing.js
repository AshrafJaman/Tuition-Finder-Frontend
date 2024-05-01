import React from "react";
import Navigation from "../Navigation/Navigation";
import "./Landing.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Landing = () => {
  let history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      history.push(`/subject/${e.target[0].value}`);
    }
  };
  return (
    <div className="landing">
      <Navigation></Navigation>
      <div>
        <div className="landingLeft">
          <h2>
          Better Tutors, Better Grades</h2>
          <form onSubmit={handleClick}>
            <SearchIcon></SearchIcon>
            <input type="text" name="search" placeholder="Search For Teacher" />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
          <div>
            <div className="chip">
              <small>Popular :</small>

              <Button onClick={() => history.push("/subject/math")}>
                Math
              </Button>
              <Button onClick={() => history.push("/subject/physics")}>
                Physics
              </Button>
              <Button onClick={() => history.push("/subject/accounting")}>
                Accounting
              </Button>
              <Button onClick={() => history.push("/subject/chemistry")}>
                Chemistry
              </Button>
            </div>
          </div>
          <br/>
        </div>
      </div>
    </div>
  );
};

export default Landing;
