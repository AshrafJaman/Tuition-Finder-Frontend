import React, { useContext } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { UserContext } from '../Context/Sign_In_Context';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { auth } from '../FirebaseConfig';
import { ADMIN_MAIL } from '../../constants';
const Navigation = () => {
  const [user, setUser] = useContext(UserContext);
  const hamburger = (e) => {
    if (e === 'out') {
      handleSignOut();
    }
    document.getElementsByClassName('for_mobile')[0].classList.toggle('hamburger__active');
    document.getElementsByClassName('hamburger')[0].classList.toggle('toggle');
    document.querySelector('body').classList.toggle('no__scroll');
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(function () {
        setUser(null);
      })
      .catch(function (error) {
        alert('There is Something Wrong');
      });
  };
  return (
    <nav className="navigation">
      <Link to="/">
        <h2>
          <i>Tuition</i> <span style={{ color: '#FFCC00' }}>Finder</span>
        </h2>
      </Link>

      <div className="for_desktop">
        <div>
          <Link to="/reqTutor">Request For a Tutor</Link>
          <Link to="/tuition-job">Tuition Jobs</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/subject/all">Browse Tutor</Link>
        </div>
        {user ? (
          <Link to="/" onClick={handleSignOut} className="link">
            Log Out
          </Link>
        ) : (
          <Link className="navigationRight" to="/login">
            <Button>Log In</Button>
          </Link>
        )}

        {!user ? (
          <Link className="navigationRight" to="/registration-tutor">
            <Button>Become A Teacher</Button>
          </Link>
        ) : (
          <>
            {user?.email === ADMIN_MAIL ? (
              <Link to={`/admin`}>
                <u>
                  Admin <AccountCircleIcon></AccountCircleIcon>
                </u>
              </Link>
            ) : (
              <Link to={`/my-profile`}>
                <u>
                  My Profile <AccountCircleIcon></AccountCircleIcon>
                </u>
              </Link>
            )}
          </>
        )}
      </div>
      <div className="hamburger" onClick={() => hamburger('burger')}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="for_mobile">
        <Link to="/reqTutor">Request For a Tutor</Link>
        <Link to="/tuition-job">Tuition Jobs</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/subject/all">All Tutor</Link>
        {user ? (
          <Link className="navigationRight" to="/" onClick={() => hamburger('out')}>
            Log Out
          </Link>
        ) : (
          <Link className="navigationRight" to="/login" onClick={() => hamburger('in')}>
            Log In
          </Link>
        )}

        {!user ? (
          <Link className="navigationRight" to="/registration-tutor">
            <Button>Become A Teacher</Button>
          </Link>
        ) : (
          <Link to={`/my-profile`}>
            <u>
              My Profile <AccountCircleIcon></AccountCircleIcon>
            </u>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
