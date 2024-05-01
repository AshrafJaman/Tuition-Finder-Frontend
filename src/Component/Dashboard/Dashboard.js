import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Counter from '../Counter/Counter';
import Navigation from '../Navigation/Navigation';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';
import DashTable from './DashTable';
import DashContact from './DashContact';
import { API_URL } from '../../constants';
const Dashboard = () => {
  const [contact, setContact] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const handleDashboard = () => {
    setStep(1);
  };
  const handleContact = () => {
    setStep(3);
    if (contact.length === 0) {
      setLoad(true);
      fetch(`${API_URL}/contact`)
        .then((response) => response.json())
        .then((json) => {
          setContact(json);
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  };
  const handleJobs = () => {
    setStep(2);
    if (jobs.length === 0) {
      setLoad(true);
      fetch(`${API_URL}/jobs`)
        .then((response) => response.json())
        .then((json) => {
          setJobs(json);
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  };
  const handleDelete = (id) => {
    // const newArr = jobs.filter((x) => x._id !== id);
    // setJobs(newArr);
    // fetch(`${API_URL}/delete/jobs/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.text())
    //   .then((json) => console.log(json));
  };
  return (
    <div className="dashboard">
      <Navigation></Navigation>
      <div>
        <div>
          <Button className={step === 1 && 'dashboard_active'} onClick={handleDashboard}>
            Dashboard
          </Button>
          <Button onClick={handleJobs} className={step === 2 && 'dashboard_active'}>
            Tuition Request
          </Button>
          <Button className={step === 3 && 'dashboard_active'} onClick={handleContact}>
            Contact Request{' '}
          </Button>
        </div>
        {load && <div className="loading">Loading&#8230;</div>}
        {step === 1 && <Counter></Counter>}
        {step === 2 && (
          <div>
            <div>
              <div className="tbl-header" style={{ overflowX: 'auto' }}>
                <table cellpadding="0" cellspacing="0" border="0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Mobile</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tbl-content">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                    {jobs.length !== 0 &&
                      jobs.map((x, index) => (
                        <DashTable x={x} handleDelete={handleDelete}></DashTable>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div>
              <div className="tbl-header" style={{ overflowX: 'auto' }}>
                <table cellpadding="0" cellspacing="0" border="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>MObile</th>
                      <th>Message</th>
                      <th>Teacher Id</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tbl-content">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                    {contact.length !== 0 && contact.map((x) => <DashContact x={x}></DashContact>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
