import './Register.css';

import { useForm } from 'react-hook-form';
import Navigation from '../Navigation/Navigation';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { API_URL } from '../../constants';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Register = () => {
  const { error, loading, createAccount, user, updateProfile } = useAuth();

  const { handleSubmit, errors, register, getValues } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  async function onSubmit(data) {
    try {
      const { name, email, password } = data;

      await createAccount(email, password);
    } catch (error) {}
  }

  async function saveUserToDB(payload) {
    try {
      fetch(`${API_URL}/post/user`, {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (user) {
      updateProfile(getValues('name'));

      const userData = {
        name: getValues('name'),
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        email: user.email,
        photo: user.photoURL,
      };

      saveUserToDB(userData);

      history.push('/my-profile');
    }
  }, [user]);

  return (
    <div className="reg-container">
      <Navigation />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="heading">Create Account</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Name</label>
          <input name="name" ref={register} placeholder="full name" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" ref={register} placeholder="email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" ref={register} placeholder="password" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Please wait...' : 'Register'}
        </button>

        <div className="or-text">Or</div>

        <button type="button" className="btn login-btn" onClick={() => history.push('/login')}>
          Login
        </button>
      </form>
    </div>
  );
};
export default Register;
