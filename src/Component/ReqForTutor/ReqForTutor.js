import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation/Navigation';
import { Button, CircularProgress, Link, Modal, Snackbar } from '@material-ui/core';
import { JobsContext } from '../Context/Jobs_Context';
import { API_URL } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '40px 0px 5px 0px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const validateSchema = yup.object().shape({
  fullName: yup.string().required().max(20),
  email: yup.string().required().email(),
  title: yup.string().required().max(30),
  mobile: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .test('len', 'Must be exactly 11 characters', (val) => val.toString().length === 10),
  age: yup
    .number()
    .positive("Age can't start with a minus")
    .integer("Age can't include a decimal point")
    .required('Age is Required')
    .typeError('Age must be a number'),
  subject: yup.string().required('Subject Is Required'),
  location_1: yup.string().required('Present Location is Required'),
  class: yup.string().required('Class is Required'),
  salary: yup.number().typeError('Salary must be a number').required('Salary is Required'),
});
const ReqForTutor = ({ jobToEdit }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validateSchema),
  });
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [jobs, setJobs] = useContext(JobsContext);
  const [snack, setSnack] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    document.body.classList.remove('no__scroll');
  }, []);

  useEffect(() => {
    if (jobToEdit) {
      reset(jobToEdit);
    }
  }, [jobToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      const curUser = auth.getCurrentUser();

      const payload = jobToEdit
        ? {
            ...jobToEdit,
            ...data,
          }
        : {
            ...data,
            assigned: false,
            isApproved: false,
            authEmail: curUser.email,
            uid: curUser.uid,
          };

      setSpin(true);

      const apiUrl = jobToEdit
        ? `${API_URL}/update/my-jobs/${jobToEdit._id}`
        : `${API_URL}/post/job`;
      const method = jobToEdit ? 'PATCH' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit job');
      }

      const responseData = await response.json();
      setOpen(true);
      setSpin(false);
      setJobs([...jobs, payload]);
      reset();

      if (jobToEdit) {
        handleSnack('Updated successfully');
        reset(responseData.job);
      }
    } catch (error) {
      console.error('Error submitting job:', error.message);
      setSpin(false);
      handleSnack(jobToEdit ? 'Failed to update' : 'Failed to submit job');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(null);
  };

  return (
    <div className="tutorRegi">
      <Navigation></Navigation>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>{jobToEdit ? 'Edit the Job' : 'Please Fill The Form For Request A Tutor:'}</h3>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              ref={register}
              style={errors.fullName && { border: '1px solid red' }}
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail *"
              style={errors.email && { border: '1px solid red' }}
              ref={register}
            />
            <input
              type="text"
              name="title"
              placeholder="Tuition Title *"
              style={errors.email && { border: '1px solid red' }}
              ref={register}
            />
          </div>
          <div>
            <p style={{ color: 'red' }}>{errors.fullName?.message}</p>
            <p style={{ color: 'red' }}>{errors.email?.message}</p>
            <p style={{ color: 'red' }}>{errors.title?.message}</p>
          </div>
          <div>
            <input
              type="number"
              name="mobile"
              placeholder="Enter Your Mobile Number *"
              style={errors.mobile && { border: '1px solid red' }}
              ref={register}
            />
            <label htmlFor="gender">Student Gender:</label>
            <select name="gender" placeholder="Gender" defaultValue="Male" ref={register}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="number"
              name="age"
              placeholder="Enter Student Age "
              style={errors.age && { border: '1px solid red' }}
              ref={register}
            />
            <input
              type="text"
              name="subject"
              placeholder="Enter Tuition Subject "
              style={errors.age && { border: '1px solid red' }}
              ref={register}
            />
          </div>
          <div>
            <p style={{ color: 'red' }}>{errors.mobile?.message}</p>
            <p style={{ color: 'red' }}>{errors.age?.message}</p>
            <p style={{ color: 'red' }}>{errors.subject?.message}</p>
          </div>
          <div>
            <textarea
              name="location_1"
              rows="3"
              placeholder="TuiTion Location"
              style={errors.location_1 && { border: '1px solid red' }}
              ref={register}
            ></textarea>
          </div>
          <div>
            <p style={{ color: 'red' }}>{errors.location_1?.message}</p>
          </div>
          <div>
            <input
              type="text"
              name="class"
              placeholder="Enter Student Class "
              style={errors.class && { border: '1px solid red' }}
              ref={register}
            />
            <label htmlFor="medium">Student Medium :</label>
            <select name="medium" defaultValue="Bangle" ref={register}>
              <option value="Bangle">Bangle</option>
              <option value="English">English</option>
            </select>
            <label htmlFor="days_per_week">Days Per Week</label>
            <select name="days_per_week" defaultValue="3" ref={register}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <input
              type="number"
              placeholder="Salary Per Month"
              name="salary"
              ref={register}
              style={errors.salary && { border: '1px solid red' }}
            />
          </div>
          <div>
            <p style={{ color: 'red' }}>{errors.class?.message}</p>
          </div>
          <div>
            <textarea
              rows="3"
              name="extra_info"
              placeholder="Extra Information For Tutor"
              ref={register}
            />
          </div>
        </div>

        {/* educational history */}

        <div className="two_btn">
          <div>
            <Button type="submit" color="primary" variant="contained">
              {jobToEdit ? 'Save Changes' : 'Submit'}
              {spin ? (
                <CircularProgress
                  color="inherit"
                  size={22}
                  style={{ marginLeft: '10px', marginBottom: '3px' }}
                />
              ) : null}
            </Button>
          </div>
        </div>
      </form>
      {!jobToEdit && (
        <Modal className={classes.modal} open={open} onClose={handleClose}>
          <div className="modal">
            <div>
              <div>
                <Link t0="/">
                  {' '}
                  <i>tuition finder</i>
                </Link>
                <h3>
                  <i>Thanks For Your Interest</i>
                </h3>
              </div>
            </div>
            <div style={{ padding: '50px 10px' }}>
              <h2>Your Request For Tutor is Submitted Successfully</h2>
              <p>We Will contact with you as soon as possible</p>
            </div>
          </div>
        </Modal>
      )}

      <Snackbar open={!!snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReqForTutor;
