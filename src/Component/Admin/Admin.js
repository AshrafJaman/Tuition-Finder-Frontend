import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminBlog from './AdminBlog';
import AdminContact from './AdminContact';
import AdminDashboard from './AdminDashboard';
import AdminSideBar from './AdminSideBar';
import AdminTuition from './AdminTuition';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { API_URL } from '../../constants';
import AdminAssignedTuitions from './AdminAssignedTuitions';
import AdminTutorList from './AdminTutorList';
import AdminAssignedStudents from './Students-Assigned';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Admin = () => {
  const [step, setStep] = useState(1);
  const [allTuition, setAllTuition] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [tutors, setTutor] = useState([]);
  const [, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);

  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setOpen(true);
    setSnack(false);
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/jobs`)
        .then((response) => response.json())
        .then((json) => {
          setAllTuition(json);
        }),

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setTutor(data);
        }),

      fetch(`${API_URL}/contact`)
        .then((response) => response.json())
        .then((json) => {
          setAllContact(json);
        }),
    ]);
  }, []);

  return (
    <div className="admin">
      <AdminSideBar step={step} setStep={setStep} />
      {step === 1 && <AdminDashboard />}
      {step === 2 && (
        <AdminTuition
          allTuition={allTuition}
          setAllTuition={setAllTuition}
          handleSnack={handleSnack}
        />
      )}

      {step === 3 && (
        <AdminTutorList tutors={tutors} setTutors={setTutor} handleSnack={handleSnack} />
      )}

      {step === 4 && <AdminContact allContact={allContact} />}

      {step === 5 && <AdminBlog handleSnack={handleSnack} />}

      {step === 6 && <AdminAssignedTuitions tuitions={allTuition} handleSnack={handleSnack} />}

      {step === 7 && <AdminAssignedStudents tutors={tutors} handleSnack={handleSnack} />}

      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Admin;
