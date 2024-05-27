import React, { useContext, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TopTutor.css';
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';
import StarsIcon from '@material-ui/icons/Stars';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TeacherContext } from '../Context/TeacherList_Context';
import { JobsContext } from '../Context/Jobs_Context';
import { UserContext } from '../Context/Sign_In_Context';
// import Feature from '../Feature/Feature';
import ApplyNowBtn from '../Apply-Now-Btn/Apply-now-btn';
import { Alert } from '@material-ui/lab';

const settings = {
  dots: false,
  // centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const TopTutor = () => {
  const [, , , filteredTeacher] = useContext(TeacherContext);
  const [jobs] = useContext(JobsContext);
  const [user] = useContext(UserContext);

  const [snack, setSnack] = useState(null);

  function handleSnackMessage(msg) {
    setSnack(msg);
  }
  function handleSnackClose() {
    setSnack(null);
  }




  const t = filteredTeacher.map((t) => {
    const applicants = t?.applicants || [];


    const ratings = applicants.reduce((acc, cur) => acc + (cur?.rating || 0), 0);


    return {
      ...t,
      ratings,
    }
  }).sort((a, b) => b.ratings - a.ratings)


  return (
    <>
      <div className="topTutor">
        <div>
          <h2>Popular Tutor </h2>
          <p>Find the best tutor for you</p>
        </div>
        <Slider {...settings}>
          {t.length !== 0 &&
            t
              .slice(0, 5)
              .map((x, index) => (
                <Link to={`/profile/${x._id}`} key={index}>
                  <Card className="tutorCard">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={x.personal.fullName}
                        height="260"
                        image={x.personal.img}
                        title={x.personal.fullName}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h2" className="expert">
                        {x.personal.fullName}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        className="expert"
                      >
                        <StarsIcon></StarsIcon>
                        {x.education.subject}
                      </Typography>
                      <Typography variant="body2" component="div">
                        <Rating tutor={x} />
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </Slider>
      </div>
      {/* <Feature></Feature> */}
      <div className="tuition_job tuition_job_home">
        <h2>Tuition Jobs</h2>
        <p>Grab Your Opportunity</p>
        {
          <Grid container>
            {jobs.slice(0, 3).map((x, i) => (
              <Grid item sm={12} md={6} lg={4} key={i}>
                <Card className="card">
                  <div>
                    <small>#Tuition Id: {x._id}</small>
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
                    <p>Salary :</p>
                    <p>{x.salary} Tk/Month</p>
                  </div>

                  {user && (
                    <div>
                      <h4># {x.extra_info}</h4>
                    </div>
                  )}
                  <div>
                    {!user && (
                      <Button>
                        <Link to="/login">Sign In To See Details</Link>
                      </Button>
                    )}

                    {user && (
                      <ApplyNowBtn
                        tuition={x}
                        handleSnackMessage={handleSnackMessage}
                        userEmail={user.email}
                      />
                    )}
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        }
        <Link to="/tuition-job">
          <Button variant="contained" className="tuitionJob_btn">
            View More
          </Button>
        </Link>
      </div>

      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TopTutor;




const Rating = ({ tutor }) => {

  function getRating() {
    const applicants = tutor.applicants;

    const ratingsArr = applicants.filter((a) => a?.rating > 0 ? true : false);

    const ratings = ratingsArr.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0)


    if (!ratingsArr.length) return 0;

    return ratings / ratingsArr.length;

  }


  const rating = tutor?.applicants ? getRating() : 0

  return (
    <StarRatings
      rating={rating}
      starRatedColor="#0866FF"
      numberOfStars={5}
      starDimension="25px"
      starSpacing="5px"
      name="rating"
    />
  )
}
