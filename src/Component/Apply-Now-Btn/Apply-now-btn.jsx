import { Button, CircularProgress, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const ApplyNowBtn = ({ tuition, handleSnackMessage, userEmail }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const auth = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleApply() {
    const user = auth.getCurrentUser();

    const payload = {
      displayName: user.displayName || '',
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    setUser(payload);
    handleOpen();
  }

  async function handleApplyConfirm() {
    const payload = {
      user,
      tuition,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/update/tuition-requests`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.status) {
        handleSnackMessage('Application submitted, we will get back to you soon.');
      } else {
        handleSnackMessage(data.message);
      }

      handleClose();
    } catch (error) {
      handleSnackMessage('Failed to submit application');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {userEmail === tuition.authEmail ? null : <Button onClick={handleApply}>Apply</Button>}

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <TextField
            value={user?.displayName || ''}
            onChange={(e) => setUser((prev) => ({ ...prev, displayName: e.target.value }))}
            label="Name"
            fullWidth
            className={classes.input}
          />

          <TextField
            value={user?.email || ''}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            label="Email"
            fullWidth
            className={classes.input}
            disabled
          />

          <TextField
            value={user?.phoneNumber || ''}
            onChange={(e) => setUser((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            label="Phone Number"
            fullWidth
            className={classes.input}
          />

          <Button
            onClick={handleApplyConfirm}
            variant="contained"
            fullWidth
            color="primary"
            className={classes.btn}
          >
            Submit{' '}
            {loading ? (
              <CircularProgress color="inherit" size={20} style={{ marginLeft: '10px' }} />
            ) : null}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ApplyNowBtn;
