import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
export const BlogContext = createContext();

export const Blogs_Context = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/blog`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return <BlogContext.Provider value={[blogs, setBlogs]}>{props.children}</BlogContext.Provider>;
};
