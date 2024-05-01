import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./SubjectList.css";
const SubjectList = () => {
  return (
    <div className="subjectList">
      <div>
        <div>
          <Navigation></Navigation>
          <div>
            <h2>More Subjects For You</h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Science Tutors</h3>
          <ul>
            <li>
              <Link to="/subject/physics">Physics Tutors</Link>
            </li>
            <li>
              <Link to="/subject/chemistry">Chemistry Tutors</Link>
            </li>
            <li>
              <Link to="/subject/math">Higher Math Tutors</Link>
            </li>
            <li>
              <Link to="/subject/biology">Biology Tutors</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Humanities Tutors</h3>
          <ul>
            <li>
              <Link to="/subject/history">HistoryTutors</Link>
            </li>
            <li>
              <Link to="/subject/english">English Tutors</Link>
            </li>
            <li>
              <Link to="/subject/geology">Geology Tutors</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Business Tutors</h3>
          <ul>
            <li>
              <Link to="/subject/economics">Economics Tutors</Link>
            </li>
            <li>
              <Link to="/subject/accounting">Accounting Tutors</Link>
            </li>
            <li>
              <Link to="/subject/marketing">Marketing Tutors</Link>
            </li>
            <li>
              <Link to="/subject/finance">Finance Tutors</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
