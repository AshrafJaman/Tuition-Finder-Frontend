import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';
import { API_URL } from '../../constants';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBlock: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& svg': {
      marginInline: 'auto',
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  noJobs: {
    color: '#fff',
    marginTop: '50px',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
}));

const MyTuitionJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (!auth.user) return;

    fetchJobs();
  }, [auth.user]);

  async function fetchJobs() {
    try {
      const { email, uid } = auth.user;

      const url = `${API_URL}/post/job/my-jobs`;

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, uid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Error fetching jobs');
      }

      const data = await res.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      alert('Something went wrong while fetching jobs');
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      handleSnack('Jobs Deleted Successfully');

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  const handleEdit = (job) => {
    history.push('/my-tuition-jobs/edit/' + job._id, {
      job,
    });
  };

  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(null);
  };

  return (
    <div className="tuition_job tuitionBox">
      <Navigation />

      {loading ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : jobs.length === 0 ? (
        <Typography variant="h6" align="center" gutterBottom className={classes.noJobs}>
          No jobs to display.
        </Typography>
      ) : (
        <Grid container spacing={3} className={classes.grid}>
          {jobs.map((job) => (
            <Grid item key={job._id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {job.subject} - {job.class}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Location: {job.location_1}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Salary: {job.salary}
                  </Typography>
                </CardContent>

                {!job.assigned && (
                  <div className={classes.actionButtons}>
                    <IconButton aria-label="edit" onClick={() => handleEdit(job)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(job._id)}
                      className={classes.deleteButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={!!snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyTuitionJob;
