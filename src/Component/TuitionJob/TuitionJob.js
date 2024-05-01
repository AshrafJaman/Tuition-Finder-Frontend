import { Button, Card, Grid, Snackbar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./TuitionJob.css";
import { UserContext } from "../Context/Sign_In_Context";
import { Link } from "react-router-dom";
import { JobsContext } from "../Context/Jobs_Context";
import ApplyNowBtn from "../Apply-Now-Btn/Apply-now-btn";
import { Alert } from "@material-ui/lab";

const TuitionJob = () => {
  const [user] = useContext(UserContext);
  const [jobs] = useContext(JobsContext);
  const [arr, setArr] = useState([]);
  const [snack, setSnack] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target[0].value !== "hide") {
      const newArr = jobs.filter(
        (x) => x.subject.toLowerCase() === e.target[0].value
      );
      setArr(newArr);
    }
    if (e.target[1].value !== "hide") {
      const newArr = jobs.filter((x) => x.medium === e.target[1].value);
      setArr(newArr);
    }
    if (e.target[2].value !== "hide") {
      const newArr = jobs.filter((x) => x.class === e.target[2].value);
      setArr(newArr);
    }
  };
  useEffect(() => {
    setArr(jobs);
  }, [jobs]);

  useEffect(() => {
    document.querySelector("body").classList.remove("no__scroll");
  }, []);

  function handleSnackMessage(msg) {
    setSnack(msg);
  }
  function handleSnackClose() {
    setSnack(null);
  }

  return (
    <div className="tuition_job tuitionBox">
      <Navigation></Navigation>
      <div className="filter">
        <form onSubmit={handleChange}>
          <select name="subject">
            <option value="hide">-- Subject --</option>
            <option value="math">Math</option>
            <option value="english">English</option>
            <option value="accounting">Accounting</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="accounting">Accounting</option>
            <option value="geology">Geology</option>
            <option value="history">History</option>
          </select>
          <select name="medium">
            <option value="hide">-- Medium --</option>
            <option value="Bangle">Bangle</option>
            <option value="English">English</option>
            <option value="Both">Both</option>
          </select>
          <select name="prefer_class">
            <option value="hide">-- Student Class --</option>
            <option value="Any">Any Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button type="submit">Filter</button>
        </form>
      </div>
      <Grid container>
        {arr.map((x, i) =>
          !x.isApproved ? null : (
            <Grid key={i} item sm={12} md={6} lg={4}>
              <Card className="card" data-aos="zoom-in">
                <div>
                  <small style={{ color: "#0866FF" }}>
                    #Tuition Id: {x._id}
                  </small>
                </div>
                <div>
                  <h3>{x.title}</h3>
                </div>
                <div>
                  <p>Class: </p>
                  <p>{x.class}</p>
                </div>
                <div>
                  <p>Location: </p>
                  <p>{x.location_1}</p>
                </div>
                <div>
                  <p>Days :</p>
                  <p>{x.days_per_week}</p>
                </div>
                <div>
                  <p>Subject :</p>
                  <p>{x.subject}</p>
                </div>
                <div>
                  <p>Medium :</p>
                  <p>{x.medium}</p>
                </div>
                {/* {user && user.email === "ashrafjaman247@gmail.com" && (
                  <div>
                    <p>Salary :</p>
                    <p>{x.salary} Tk/Month</p>
                  </div>
                )} */}
                <div>
                  <p>Salary :</p>
                  <p>{x.salary} Tk/Month</p>
                </div>
                {/* {user && (
                  <div>
                    <p>Email :</p>
                    <p>{x.email}</p>
                  </div>
                )} */}

                {/* {user && (
                  <div>
                    <p>Mobile :</p>
                    <p>{x.mobile}</p>
                  </div>
                )} */}
                {user && (
                  <div>
                    <h4># {x.extra_info}</h4>
                  </div>
                )}
                <div>
                  {!user ? (
                    <Button>
                      <Link to="/login">Sign In To See Details</Link>
                    </Button>
                  ) : (
                    <ApplyNowBtn
                      tuition={x}
                      handleSnackMessage={handleSnackMessage}
                      userEmail={user.email}
                    />
                  )}
                </div>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TuitionJob;
