import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import Navigation from '../Navigation/Navigation';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import { API_URL } from '../../constants';

const TutorApplicantsRequests = () => {
  const location = useLocation();
  const [loading] = useState(false);

  const [tutor, setTutor] = useState(location.state.applicants);

  async function handleAssign(applicant) {
    try {
      const payload = {
        tutorId: tutor._id,
        assignedTo: applicant,
      };

      const url = API_URL + '/update/tutors/student/assign/' + payload.tutorId;

      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
        },
      });

      const jsonData = await res.json();

      if (jsonData.status) {
        setTutor((prev) => ({
          ...prev,
          applicants: jsonData.data.applicants,
        }));
      }
    } catch (error) {
      alert('Something went wrong');
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="tuitionBox">
      <Navigation />

      <h1 className="applicants">Applicants</h1>

      <Grid container spacing={5}>
        {tutor.applicants.map((applicant, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {applicant.displayName}
                </Typography>
                <br />
                <Typography color="textSecondary" gutterBottom>
                  {applicant.email}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  Phone Number: {applicant.phoneNumber || 'N/A'}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  Study Hours: {applicant.studyHours}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  Subject: {applicant.subject}
                </Typography>
                <br />

                <div className="assign-btn-wrapper">
                  <div>
                    <Typography variant="body2" component="p">
                      Subject: {applicant.subject}
                    </Typography>{' '}
                    <br />
                    <Typography variant="body2" component="p">
                      Salary: {applicant.salary}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="p">
                      Note: {applicant.note}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color={applicant?.assigned ? 'secondary' : 'primary'}
                    onClick={() => handleAssign(applicant)}
                    fullWidth
                    disabled={applicant?.assigned}
                  >
                    {applicant?.assigned ? 'Assigned' : 'Assign'}
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

export default TutorApplicantsRequests;
