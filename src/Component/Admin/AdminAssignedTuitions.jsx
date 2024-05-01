import { Button, Card, CardActions, CardContent, Modal, makeStyles } from '@material-ui/core';
import { useState } from 'react';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'transparent',
    paddingBottom: 4,
  },
  noJobs: {
    paddingBlock: '20px',
    textAlign: 'center',
  },
}));

const AdminAssignedTuitions = ({ tuitions }) => {
  const assignedJobs = tuitions.filter((d) => d.assigned);

  const [selectedTuition, setSelectionTuition] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    setSelectionTuition(null);
  };

  return (
    <div className="adminTuition">
      <h3>Assigned Tuitions List</h3>

      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Tuition ID</th>
              <th>Tutor Name</th>
              <th>Tutor Email</th>
              <th>Tutor Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {!assignedJobs.length ? (
              <tr className={classes.noJobs}>No Jobs Assigned yet</tr>
            ) : (
              assignedJobs.map((job) => (
                <tr key={job._id}>
                  <td>#{job._id}</td>
                  <td>{job.assignedTo.displayName}</td>
                  <td>{job.assignedTo.email}</td>
                  <td>{job.assignedTo.phone || 'N/A'}</td>
                  <td>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectionTuition(job);
                      }}
                      size="small"
                    >
                      View Tuition Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedTuition && (
        <Modal open onClose={handleClose} style={modalStyle} className={classes.paper}>
          <Card style={{ padding: 10 }}>
            <CardContent>
              <div>
                <br />
                <small style={{ color: '#0866FF' }}>#Tuition Id: {selectedTuition._id}</small>
                <br />
              </div>

              <h3>{selectedTuition.title}</h3>
              <br />

              <p>Class: {selectedTuition.class}</p>
              <br />

              <p>Location: {selectedTuition.location_1}</p>
              <br />

              <p>Days: {selectedTuition.days_per_week}</p>
              <br />

              <p>Subject: {selectedTuition.subject}</p>
              <br />

              <p>Medium: {selectedTuition.medium}</p>
              <br />

              <p>Salary: {selectedTuition.salary} Tk/Month</p>
              <br />

              <p>Email: {selectedTuition.email}</p>
              <br />

              <p>Mobile: {selectedTuition.mobile}</p>
              <br />

              <div>
                <h4># {selectedTuition.extra_info}</h4>
              </div>
            </CardContent>

            <CardActions>
              <Button variant="contained" color="primary" fullWidth onClick={handleClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </Modal>
      )}
    </div>
  );
};
export default AdminAssignedTuitions;
