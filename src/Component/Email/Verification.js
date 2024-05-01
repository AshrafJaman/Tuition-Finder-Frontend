import React, { useState } from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import './Verification.css';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const Verification = () => {
  const auth = useAuth();
  const history = useHistory();
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSendVerification = async () => {
    try {
      await auth.sendEmailVerification();
      setVerificationSent(true);
    } catch (error) {
      alert('Error sending verification email:', error.message);
    }
  };

  return (
    <div className="verification-container">
      {!verificationSent ? (
        <>
          <Typography variant="h5">
            Please verify your email address to complete your registration
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSendVerification}
            disabled={auth.loading}
            className="verification-btn"
          >
            {auth.loading ? <CircularProgress size={24} /> : 'Send Verification Email'}
          </Button>

          <Button onClick={() => history.push('/')} variant="outlined">
            Go to Home
          </Button>
          {auth.error && <Typography color="error">{auth.error}</Typography>}
        </>
      ) : (
        <>
          <Typography variant="h5">Email verification link sent!</Typography>
          <Typography variant="body1">
            Please check your inbox and click on the verification link to complete your
            registration.
          </Typography>
          <Button color="primary" variant="contained" href="/">
            Ok
          </Button>
        </>
      )}
    </div>
  );
};

export default Verification;
