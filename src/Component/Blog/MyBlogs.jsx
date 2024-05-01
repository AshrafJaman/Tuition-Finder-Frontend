import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../constants';
import Navigation from '../Navigation/Navigation';
import { CircularProgress, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import BlogCard from './BlogCard';
import BlogPost from './BlogPost';

const MyBlogs = () => {
  const auth = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();

    if (!currentUser) return;

    setLoading(true);
    fetch(`${API_URL}/blog/my-blogs/` + currentUser.email)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [auth.user, snackOpen]);

  const handleSnack = (msg) => {
    setSnackMessage(msg);
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  async function handleDelete(blogId) {
    try {
      const response = await fetch(`${API_URL}/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      handleSnack('Deleted Successfully');
    } catch (error) {
      handleSnack(error.message || 'Something went wrong');
    }
  }

  return (
    <div className="my-blogs blog">
      <>
        <div className="blog__top">
          <Navigation />
        </div>
        <div className="blog__title">
          <h3>{showBlogForm ? 'Create Blog' : 'My Blogs'}</h3>
        </div>

        {showBlogForm ? (
          <BlogPost />
        ) : (
          <>
            {loading ? (
              <div style={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
                <CircularProgress size={28} />
              </div>
            ) : (
              <>
                {blogs?.length > 0 ? (
                  <div className="blog__container">
                    {blogs.map((x, idx) => (
                      <BlogCard
                        x={x}
                        key={idx}
                        isEditable
                        isDeletable
                        onDelete={handleDelete}
                        showAll
                      />
                    ))}
                  </div>
                ) : (
                  <Typography style={{ textAlign: 'center', margin: '40px 0' }}>
                    You have not written any blog yet.
                  </Typography>
                )}
              </>
            )}

            <div className="blog_post_button">
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => setShowBlogForm(!showBlogForm)}
              >
                <EditIcon />
              </Fab>
            </div>

            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose}>
              <Alert severity="success" onClose={handleSnackClose}>
                {snackMessage}
              </Alert>
            </Snackbar>
          </>
        )}
      </>
    </div>
  );
};
export default MyBlogs;
