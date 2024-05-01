import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DashTable = ({ x, handleDelete, handleApprovedOrDiscard }) => {
  const history = useHistory();

  function handleViewApplicants() {
    history.push('/admin/tuition-requests/' + x._id, {
      tuition: x,
    });
  }

  if (x.status === 'taken') {
    return null;
  }

  return (
    <>
      <tr>
        <td>{x.title}</td>
        <td>{x.fullName}</td>
        <td>{x.email}</td>
        <td>{x.location_1}</td>
        <td>{x.mobile}</td>
        <td>{x.status === 'taken' ? 'Assigned' : 'Not Assigned Yet'}</td>
        <td>{x?.applicants?.length || 0}</td>
        <td style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
          {x?.applicants && !!x.applicants.length && !x.assigned ? (
            <Button size="small" color="primary" variant="contained" onClick={handleViewApplicants}>
              View Applicants
            </Button>
          ) : null}
          <Button
            variant="contained"
            color={!x?.isApproved ? 'primary' : 'default'}
            onClick={() => handleApprovedOrDiscard(x)}
            size="small"
          >
            {x?.isApproved ? 'Discard' : 'Approve'}
          </Button>

          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => handleDelete(x._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default DashTable;
