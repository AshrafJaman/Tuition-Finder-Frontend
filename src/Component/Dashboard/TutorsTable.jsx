import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const TutorsTable = ({ tutor, handleApprovedOrDiscard, handleDeleteTutor }) => {
  const history = useHistory();

  function handleViewApplicants() {
    history.push('/admin/tutors/tuition-applicants/' + tutor._id, {
      applicants: tutor,
    });
  }

  return (
    <>
      <tr>
        <td>{tutor?.personal?.fullName}</td>
        <td>{tutor?.personal?.email}</td>
        <td>{tutor?.personal?.mobile}</td>
        <td>
          {tutor?.personal?.location_1}, {tutor?.personal?.location_2}
        </td>
        <td>{tutor?.tuition?.salary}</td>
        <td>{tutor?.tuition?.available ? 'AVAILABLE' : 'NOT AVAILABLE'}</td>
        {/* <td>{x.status === 'taken' ? 'Assigned' : 'Not Assigned Yet'}</td> */}
        {/* <td>{x?.applicants?.length || 0}</td> */}
        <td style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
          <Button
            onClick={() => history.push(`/profile/${tutor._id}`)}
            variant="contained"
            color="inherit"
            style={{ color: '#000' }}
          >
            View Details
          </Button>
          {tutor?.applicants && !!tutor.applicants.length && !tutor.assigned ? (
            <Button size="small" color="primary" variant="contained" onClick={handleViewApplicants}>
              View Applicants
            </Button>
          ) : null}
          <Button
            variant="contained"
            color={!tutor?.isApproved ? 'primary' : 'default'}
            onClick={() => handleApprovedOrDiscard(tutor)}
            size="small"
          >
            {tutor?.isApproved ? 'Discard' : 'Approve'}
          </Button>

          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => handleDeleteTutor(tutor)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TutorsTable;
