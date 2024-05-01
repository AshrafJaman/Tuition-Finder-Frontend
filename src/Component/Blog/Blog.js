import { Fab } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { BlogContext } from '../Context/Blogs_Context';
import Navigation from '../Navigation/Navigation';
import './Blog.css';
import BlogCard from './BlogCard';
import EditIcon from '@material-ui/icons/Edit';
import { UserContext } from '../Context/Sign_In_Context';
import BlogPost from './BlogPost';

const Blog = () => {
  const [blogs] = useContext(BlogContext);
  const [user] = useContext(UserContext);
  const [show, setShow] = useState(false);

  return (
    <div className="blog">
      <div className="blog__top">
        <Navigation></Navigation>
      </div>
      <div className="blog__title">
        <h3>Blog</h3>
      </div>
      {!show && (
        <div className="blog__container">
          {blogs.map((x, idx) => (
            <BlogCard x={x} key={idx} />
          ))}
        </div>
      )}
      {show && <BlogPost />}
      {user && (
        <div className="blog_post_button">
          <Fab color="secondary" aria-label="edit" onClick={() => setShow(!show)}>
            <EditIcon />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default Blog;
