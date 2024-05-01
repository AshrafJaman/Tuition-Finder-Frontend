import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { storage } from '../FirebaseConfig';
import { API_URL } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { TeacherContext } from '../Context/TeacherList_Context';
import { UserContext } from '../Context/Sign_In_Context';
import { getUserByUIDFromDB } from '../../utils';
import { Button, CircularProgress } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const BlogPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [teacher] = useContext(TeacherContext);
  const [contextUser] = useContext(UserContext);
  const [wait, setWait] = useState(false);
  const [, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [image, setImage] = useState(null);

  const auth = useAuth();

  const onSubmit = async (data) => {
    try {
      setWait(true);

      const newArr = teacher.find((x) => x.personal.email === contextUser.email);

      const user = auth.getCurrentUser();

      if (!user) {
        handleSnack('Please login to continue');
        return;
      }

      const { data: userData } = await getUserByUIDFromDB(user.uid);

      if (!userData) {
        handleSnack('Please login to continue');
        return;
      }

      data.authorEmail = userData?.email || contextUser.email;
      data.postBy = newArr?.personal.fullName || userData?.name;
      data.uid = userData?.uid;
      data.authorId = newArr?._id || userData?._id;

      const uploadImg = storage.ref(`images/${image.name}`).put(image);
      uploadImg.on(
        'state_changed',
        (snapshot) => {
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          //complete function
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              data.img = url;
              fetch(`${API_URL}/blog/post`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.text())
                .then((json) => {
                  setWait(false);
                  handleSnack(
                    "Your Blog is posted Successfully. It's now under review by the admin"
                  );
                  reset();
                });
            });
        }
      );
    } catch (error) {
      handleSnack('Something went wrong');
      setWait(false);
    }
  };

  const handleSnack = (msg) => {
    setOpen(true);
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(false);
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="blogPost">
      <h3>Create a Blog post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} type="text" name="title" placeholder="Title" required />
        <input ref={register} type="text" name="subTitle" placeholder="Sub Title" required />
        <label htmlFor="img">Add Image</label>
        <input ref={register} type="file" placeholder="Add Image" required onChange={handleFile} />
        <textarea
          ref={register}
          name="article"
          id=""
          cols="30"
          rows="10"
          required
          placeholder="Write Something ....."
        ></textarea>
        <Button
          size="large"
          type="submit"
          disabled={wait}
          fullWidth
          color="primary"
          variant="contained"
        >
          {wait && <CircularProgress color="inherit" style={{ marginRight: '10px' }} size={20} />}
          Submit
        </Button>
      </form>
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BlogPost;
