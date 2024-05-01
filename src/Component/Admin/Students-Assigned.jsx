import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
  btns: {
    // display: 'flex',
    // flexDirection: 'column',
  },
}));

const AdminAssignedStudents = ({ tutors }) => {
  const teachersWithApplicants = tutors
    .filter((tutor) => tutor?.applicants)
    .map((t) => {
      const assignedApplicant = t.applicants.filter((a) => a?.assigned);

      const transformedObject = assignedApplicant.map((a) => ({
        id: t._id,
        tName: t.personal.fullName,
        tEmail: t.personal.email,
        sName: a.displayName,
        sEmail: a.email,
        tutor: t,
        student: a,
      }));

      return transformedObject;
    })
    .flat();

  const history = useHistory();

  const classes = useStyles();

  return (
    <div className="adminTuition">
      <h3>Students Assigned to Teachers List</h3>

      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Teacher Email</th>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {!teachersWithApplicants.length ? (
              <tr className={classes.noJobs}>No Jobs Assigned yet</tr>
            ) : (
              teachersWithApplicants.map((item) => (
                <tr key={item.id}>
                  <td>{item.tName}</td>
                  <td>{item.tEmail}</td>
                  <td>{item.sName}</td>
                  <td>{item.sEmail}</td>
                  <td className={classes.btns}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => history.push(`/profile/${item.tutor._id}`)}
                    >
                      View Teacher Details
                    </Button>
                    <br />
                    {/* <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => history.push(`/profile/${item.student._id}`)}
                    >
                      View Student Details
                    </Button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminAssignedStudents;
