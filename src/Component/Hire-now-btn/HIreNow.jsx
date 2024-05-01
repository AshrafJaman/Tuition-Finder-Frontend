import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Modal, TextField } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { API_URL } from '../../constants';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    marginTop: 20,
  },
}));

const applySchema = yup.object().shape({
  displayName: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .notRequired(),

  subject: yup.string().required('Subject is required'),
  class: yup.string().required('Class is required'),
  studyHours: yup
    .number()
    .min(0, 'Study hours must be at least 0')
    .required('Study hours is required')
    .typeError('Please enter a valid number for study hours.'),
  salary: yup
    .string()
    .min(0, 'Salary must be at least 0')
    .required('Salary is required')
    .typeError('Please enter a valid number for salary.'),
  note: yup.string().notRequired(),
});

const HireNowBtn = ({ tutor, handleSnackMessage }) => {
  const auth = useAuth();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  const user = auth.getCurrentUser();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(applySchema),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleHireNow(e) {
    e.preventDefault();

    if (!user) {
      handleSnackMessage('You need to login first');
      return;
    }

    handleOpen();
  }

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/update/job/tutor-request/${tutor._id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.status) {
        handleSnackMessage('Application submitted, we will get back to you soon');

        handleClose();
      } else {
        handleSnackMessage(data?.message || 'Failed to submit application');
      }
    } catch (error) {
      handleSnackMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      setValue('displayName', user.displayName || '');
      setValue('email', user.email || '');
      setValue('phoneNumber', user.phoneNumber || '');
    }

    return () => {
      reset();
    };
  }, []);

  return (
    <>
      <Button size="small" color="secondary" onClick={handleHireNow} type="button">
        Hire Now
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <TextField
                  label="Name"
                  value={user?.displayName || ''}
                  fullWidth
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                />
              }
              name="displayName"
              control={control}
              defaultValue={user?.displayName}
            />

            <br />

            <Controller
              name="email"
              control={control}
              as={
                <TextField
                  label="Email"
                  value={user?.email || ''}
                  fullWidth
                  disabled
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              }
              defaultValue={user?.email}
            />
            <br />
            <Controller
              name="phoneNumber"
              control={control}
              as={
                <TextField
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              }
              defaultValue={user?.phoneNumber}
            />

            <br />

            <Controller
              name="subject"
              control={control}
              as={
                <TextField
                  label="Subject"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              }
            />

            <br />

            <Controller
              name="class"
              control={control}
              as={
                <TextField
                  label="Class"
                  fullWidth
                  error={!!errors.class}
                  helperText={errors.class?.message}
                />
              }
            />
            <br />

            <Controller
              name="studyHours"
              control={control}
              as={
                <TextField
                  label="How Many Hours"
                  fullWidth
                  error={!!errors.studyHours}
                  helperText={errors.studyHours?.message}
                  type="number"
                />
              }
            />

            <br />

            <Controller
              name="salary"
              control={control}
              as={
                <TextField
                  label="Salary"
                  fullWidth
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                  type="number"
                />
              }
            />

            <br />

            <Controller
              name="note"
              control={control}
              as={<TextField label="Special Note" fullWidth />}
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              className={classes.btn}
              type="submit"
            >
              Submit{' '}
              {loading ? (
                <CircularProgress color="inherit" size={20} style={{ marginLeft: '10px' }} />
              ) : null}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default HireNowBtn;
