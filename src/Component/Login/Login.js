import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Navigation from '../Navigation/Navigation';
import { auth } from '../FirebaseConfig';
import { UserContext } from '../Context/Sign_In_Context';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const onSubmit = (data) => {
    handleSignIn(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        history.push('/');
      } else {
        history.push('/my-profile');
      }
    }
  }, [user]);

  const handleSignIn = (email, password) => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (res) {
        if (res) {
          const { email, emailVerified } = res.user;
          const updateUser = {
            isSignIn: true,
            email: email,
            emailVerified,
          };
          setUser(updateUser);
          setLoading(false);
        }
      })
      .catch(function (error) {
        var errorMessage = error.message;
        setLoading(false);
        setErr(errorMessage || 'Something went wrong');
      });
  };

  return (
    <div className="login">
      <Navigation></Navigation>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome Back !</h2>
          <input
            type="text"
            name="email"
            placeholder="E-mail *"
            style={errors.email && { border: '1px solid red' }}
            ref={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <p style={{ color: 'red' }}>{errors.email && errors.email.message}</p>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            style={errors.password && { border: '1px solid red' }}
            ref={register({ required: 'This is Required', minLength: 6 })}
          />
          <p style={{ color: 'red' }}>
            {errors.password?.type === 'required' && 'Your input is required'}
          </p>
          <p style={{ color: 'red' }}>
            {errors.password?.type === 'minLength' && 'Password must be min Length of 6'}
          </p>
          {err && <p style={{ color: 'red' }}>{err}</p>}
          <button type="submit">{loading ? 'Signing in...' : 'Sign In'}</button>

          <div className="or-text">Or</div>
          <button
            onClick={() => history.push('/register')}
            variant="outlined"
            className="register-btn"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
