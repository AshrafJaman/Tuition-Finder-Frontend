import { Avatar, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { TeacherContext } from '../Context/TeacherList_Context';
import Counter from '../Counter/Counter';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import './AdminDashboard.css';
import { JobsContext } from '../Context/Jobs_Context';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory } from 'react-router-dom';
import AdminChart from './AdminChart';
const AdminDashboard = () => {
  const [teacher] = useContext(TeacherContext);
  const [jobs] = useContext(JobsContext);
  const [view, setView] = useState(5);
  const [viewJob, setViewJob] = useState(2);
  // const [rev, setRev] = useState([]);

  let history = useHistory();
  // console.log(jobs);
  return (
    <div className="adminDashboard">
      <h3>DashBoard</h3>
      <div>
        <AdminChart></AdminChart>
      </div>
      <div>
        <Counter></Counter>
      </div>
      <div className="adminDashboard__bottom">
        <div>
          <div className="adminDashboard__card">
            <h3>
              <RecentActorsIcon></RecentActorsIcon> Recent Joined Teacher
            </h3>
            {teacher
              .slice(0)
              .reverse()
              .slice(0, view)
              .map((x, index) => (
                <div className="adminDashboard__card_teacher" key={index}>
                  <Avatar src={x?.personal?.img}></Avatar>
                  <div>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{x?.personal?.fullName}</p>
                      <p>{x?.education?.subject}</p>
                    </div>
                    <div>
                      <button onClick={() => history.push(`/profile/${x._id}`)}>
                        Check Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <Button variant="contained" color="primary" onClick={() => setView(view + 5)}>
              VIEW MORE
            </Button>
          </div>
        </div>
        <div>
          <div className="adminDashboard__card">
            <h3>
              <WorkIcon></WorkIcon> Recent Job Post
            </h3>
            {jobs
              .slice(0)
              .reverse()
              .slice(0, viewJob)
              .map((x, index) => (
                <div className="adminDashboard__card_jobs">
                  <div>
                    <small style={{ color: '#0866FF' }}>#Tuition Id: {x._id}</small>
                  </div>
                  <div>
                    <h3>{x.title}</h3>
                  </div>
                  <div>
                    <p>Class: </p>
                    <p>{x.class}</p>
                  </div>
                  <div>
                    <p>Location: </p>
                    <p>{x.location_1}</p>
                  </div>
                  <div>
                    <p>Days :</p>
                    <p>{x.days_per_week}</p>
                  </div>
                  <div>
                    <p>Subject :</p>
                    <p>{x.subject}</p>
                  </div>
                  <div>
                    <p>Email :</p>
                    <p>{x.email}</p>
                  </div>
                  <div>
                    <p>Mobile :</p>
                    <p>{x.mobile}</p>
                  </div>
                  <div>
                    <p>Medium :</p>
                    <p>{x.medium}</p>
                  </div>
                  <div>
                    <h4>{x.extra_info && `#${x.extra_info}`}</h4>
                  </div>
                </div>
              ))}
            <Button variant="contained" color="primary" onClick={() => setViewJob(viewJob + 2)}>
              VIEW MORE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
