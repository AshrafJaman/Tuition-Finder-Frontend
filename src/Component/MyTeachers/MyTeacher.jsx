import { useContext, useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './MyTeacher';
import { TeacherContext } from '../Context/TeacherList_Context';
import { UserContext } from '../Context/Sign_In_Context';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';
import { API_URL } from '../../constants';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBlock: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  noJobs: {
    color: '#fff',
    marginTop: '50px',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },

  subject: {
    display: 'flex',
    gap: '5px',
  },
  rating: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
}));

const MyTeacher = () => {
  const [teachers] = useContext(TeacherContext);
  const [user] = useContext(UserContext);
  const [tuitions, setTuitions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const myTeachers = teachers
      .map((teacher) => {
        const myTuition = teacher?.applicants?.filter((applicant) => {
          if (applicant.email === user.email) return true;
          return false;
        });

        if (!myTuition?.length > 0) return null;

        return {
          id: teacher._id,
          teacherName: teacher.personal.fullName || 'N/A',
          teacherEmail: teacher.personal.email || 'N/A',
          myTuition: myTuition[0],
        };
      })
      .filter(Boolean);

    setTuitions(myTeachers);
  }, [teachers, user]);

  return (
    <div className="tuition_job tuitionBox">
      <Navigation />

      {tuitions?.length === 0 ? (
        <Typography variant="h6" align="center" gutterBottom className={classes.noJobs}>
          You have not been assigned any teacher yet.
        </Typography>
      ) : (
        <Grid container spacing={3} className={classes.grid}>
          {tuitions.map((tuition, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {tuition.teacherName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {tuition.teacherEmail}
                  </Typography>
                  <div className={classes.subject}>
                    <div>
                      <Typography
                        variant="body2"
                        component="p"
                        key={idx}
                        style={{ marginBottom: '10px' }}
                      >
                        {tuition.myTuition.subject}
                      </Typography>
                    </div>
                  </div>

                  <div className={classes.rating}>
                    <Rating tuition={tuition} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
export default MyTeacher;

const Rating = ({ tuition }) => {
  const [ratings, setRatings] = useState(() => tuition.myTuition.rating || 0);

  const [teachers, setTeacher, setTeacherList] = useContext(TeacherContext);
  const [user] = useContext(UserContext);

  const handleRatingChange = async (teacherId, newRating) => {
    setRatings(newRating);

    const payload = {
      teacherId,
      newRating,
      by: user.email,
    };

    try {
      const response = await fetch(`${API_URL}/update/ratings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      const newTeachers = teachers.map((t) => {
        if (t._id === data.data._id) {
          return data.data;
        }
        return t;
      });

      setTeacher(newTeachers);
      setTeacherList(newTeachers);
    } catch (e) {
      alert(e?.message || 'Something went wrong');
    }
  };

  const handleRatingRemove = async (teacherId) => {
    setRatings(0);

    try {
      const payload = {
        teacherId,
        newRating: 0,
        by: user.email,
      };

      const response = await fetch(`${API_URL}/delete/ratings`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const newTeachers = teachers.map((t) => {
        if (t._id === data.data._id) {
          return data.data;
        }
        return t;
      });

      setTeacher(newTeachers);
      setTeacherList(newTeachers);
    } catch (e) {
      console.log(e);
      alert(e?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <StarRatings
        rating={ratings}
        starRatedColor="#0866FF"
        numberOfStars={5}
        starDimension="25px"
        starSpacing="5px"
        changeRating={(newRating) => handleRatingChange(tuition.id, newRating)}
        name={`rating-${tuition.id}`}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleRatingRemove(tuition.id)}
        size="small"
      >
        Remove Rating
      </Button>
    </>
  );
};
