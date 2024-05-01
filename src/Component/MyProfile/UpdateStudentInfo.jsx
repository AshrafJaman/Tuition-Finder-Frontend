import { Controller, useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../constants';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phoneNumber: yup.string(),
  address: yup.string(),
  bio: yup.string(),
});

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const UpdateStudentInfo = ({ handleSnack, handleClose, user, setUserFromDB }) => {
  const classes = useStyles();
  const { error, loading, updateProfile } = useAuth();

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user ? { ...user } : undefined,
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/update/user-info/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update');
      }

      const jsonRes = await res.json();

      if (jsonRes.status) {
        setUserFromDB({ ...user, ...data });

        // update name on firebase
        updateProfile(data.name);
        handleSnack('Updated Successfully');
        handleClose();
      }
    } catch (error) {
      handleSnack(error?.message || 'Something went wrong');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Update Info
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Controller
        as={
          <TextField
            label="Name"
            value={user?.displayName || ''}
            fullWidth
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
          />
        }
        name="name"
        control={control}
        defaultValue={user?.displayName}
      />

      <Controller
        as={
          <TextField
            label="Phone"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
        }
        name="phoneNumber"
        control={control}
      />

      <Controller
        as={
          <TextField
            label="Address"
            fullWidth
            error={!!errors.address}
            helperText={errors.address && errors.address.message}
          />
        }
        name="address"
        control={control}
      />

      <Controller
        as={
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            error={!!errors.bio}
            helperText={errors.bio && errors.bio.message}
          />
        }
        name="bio"
        control={control}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={loading}
      >
        {loading ? 'Please wait...' : 'Save Changes'}
      </Button>
    </form>
  );
};

export default UpdateStudentInfo;
