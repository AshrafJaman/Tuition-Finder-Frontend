import { Button, Grid, Snackbar } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './FindTutor.css';
import CardBox from '../CardBox/CardBox';
import { TeacherContext } from '../Context/TeacherList_Context';
import { Alert } from '@material-ui/lab';
const FindTutor = () => {
  const [tutor, setTutor] = useState([]);
  const [, , , filteredTeacher] = useContext(TeacherContext);
  const { id } = useParams();
  const [sub, setSub] = useState(null);

  const [snack, setSnack] = useState(null);

  useEffect(() => {
    const data = filteredTeacher.filter((x) => {
      const sub = Object.keys(x.tuition.tutor_subject);
      const val = Object.values(x.tuition.tutor_subject);
      const match = sub.filter((y, index) => {
        if (val[index] === true) {
          return y;
        }
      });
      const isOk = match.find((z) => {
        if (z === id.toLowerCase()) {
          return z;
        }
      });
      if (isOk) {
        return x;
      }
    });

    setTutor(data);
  }, [filteredTeacher]);

  useEffect(() => {
    if (id === 'all') {
      setTutor(filteredTeacher);
    }
  }, [id, filteredTeacher]);

  useEffect(() => {
    document.querySelector('body').classList.remove('no__scroll');
  }, []);

  const handleTutor = (e) => {
    e.preventDefault();
    const newSub = sub[0].toLowerCase() + sub.slice(1).toLowerCase();

    // Second filter: Find tutors who match the subject
    const matchingTutors = filteredTeacher.filter((tutor) => {
      const subjects = Object.keys(tutor.tuition.tutor_subject);
      const subjectValues = Object.values(tutor.tuition.tutor_subject);

      // Check if any of the subjects match newSub and the corresponding value is true
      for (let i = 0; i < subjects.length; i++) {
        if (subjectValues[i] && subjects[i].toLowerCase() === newSub) {
          return true;
        }
      }
      return false;
    });

    setTutor(matchingTutors);
  };

  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(null);
  };

  return (
    <div className="findTutor">
      <Navigation />
      <div>
        <form onSubmit={handleTutor}>
          <input
            type="text"
            placeholder="What are you looking for ? Example: Math"
            onChange={(e) => setSub(e.target.value)}
          />
          {sub && <Button type="submit">Find Tutor</Button>}
          {!sub && (
            <Button type="submit" disabled>
              Find Tutor
            </Button>
          )}
        </form>
      </div>

      {tutor?.length > 0 ? <p style={{ color: 'white' }}>tutor?.length</p> : null}

      {tutor?.length > 0 ? (
        <Grid container>
          {tutor.map((x) => (
            <Grid item xs={12} sm={6} md={4}>
              <CardBox
                id={x._id}
                img={x.personal.img}
                name={x.personal.name}
                star={x.tuition.star.toFixed(2)}
                subject={x.education.subject}
                other={x.tuition.tutor_subject}
                inst={x.education.institution}
                verified={x.tuition.member}
                handleSnackMessage={handleSnack}
                tutor={x}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>No Teacher Available</p>
      )}

      <Snackbar open={!!snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="info" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FindTutor;
