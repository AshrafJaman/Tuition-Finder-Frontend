import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const BlogTable = ({ x, msg, handleApproved }) => {
  const history = useHistory();

  return (
    <>
      <tr>
        <td>{x?.postBy}</td>
        <td>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push(`/profile/${x?.authorId}`)}
          >
            View
          </Button>
        </td>
        <td>{x?.date}</td>
        <td>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push(`/blog/${x?._id}`)}
          >
            View
          </Button>
        </td>
        {msg && (
          <td>
            <Button
              style={{ background: 'green', color: 'white' }}
              variant="contained"
              // onClick={() => handleDelete(x._id)}
              onClick={() => handleApproved(x._id)}
            >
              {msg}
            </Button>
          </td>
        )}
      </tr>
    </>
  );
};

export default BlogTable;
