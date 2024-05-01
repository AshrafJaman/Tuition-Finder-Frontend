import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BlogContext } from '../Context/Blogs_Context';
import Navigation from '../Navigation/Navigation';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogs] = useContext(BlogContext);
  const [blog, setBlog] = useState('');
  useEffect(() => {
    if (blogs.length !== 0) {
      const bg = blogs.find((x) => x._id === id);
      setBlog(bg);
    }
  }, [id]);
  return (
    <div>
      <div className="blog__top">
        <Navigation></Navigation>
      </div>
      {/* <div className="blog__title">
        <h3>Blog</h3>
      </div> */}
      <div className="blog__img">
        <img src={blog?.img} alt="" />
      </div>
      <div className="blog__body">
        <h2 style={{ fontSize: '40px' }}>{blog?.title}</h2>
        <p>Updated {blog?.date}</p>
        <p>By {blog?.postBy}</p>
        <h3 style={{ marginTop: '20px' }}>{blog?.subTitle}</h3>
        <p style={{ fontSize: '20px', marginTop: '10px', lineHeight: '30px' }}>{blog?.article}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
