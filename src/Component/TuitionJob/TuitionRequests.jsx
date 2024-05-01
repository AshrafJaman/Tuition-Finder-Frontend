import './TuitionJob.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import { API_URL } from '../../constants';
import { Spinner } from '../Spinner/Spinner';

const TuitionRequests = () => {
  const location = useLocation();
  const [loading] = useState(false);

  const [tuition, setTuition] = useState(location.state.tuition);

  // async function fetchTuitionReqs() {
  //   try {
  //     const id = location.pathname.split('/').pop();
  //     const url = `${API_URL}/tuition-requests/${id}`;

  //     const res = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });

  //     const data = await res.json();
  //     setApplicants(data.applicants);
  //   } catch (error) {
  //     console.error('Error fetching tuition requests:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchTuitionReqs();
  // }, []);

  const handleAssign = async (applicant) => {
    const payload = {
      tuition: {
        id: tuition._id,
        assigned: true,
      },
      assignedTo: applicant,
    };

    try {
      const url = API_URL + '/update/job/tuition-requests/' + payload.tuition.id;

      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.status) {
        setTuition((prev) => ({
          ...prev,
          applicants: prev.applicants.filter(
            (applicant) => applicant.email === payload.assignedTo.email
          ),
        }));
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="tuitionBox">
      <Navigation />
      <h1 className="applicants">Applicants</h1>
      <Grid container spacing={3}>
        {tuition.applicants.map((applicant) => (
          <Grid key={applicant._id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {applicant.displayName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {applicant.email}
                </Typography>
                <Typography variant="body2" component="p">
                  Phone Number: {applicant.phoneNumber || 'N/A'}
                </Typography>
                <br />

                <div className="assign-btn-wrapper">
                  <div>
                    <Typography variant="body2" component="p">
                      Subject: {tuition.subject}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Salary: {tuition.salary}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssign(applicant)}
                  >
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default TuitionRequests;
