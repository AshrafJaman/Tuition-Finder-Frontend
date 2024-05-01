import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
const BlogCard = ({
  x,
  showAll = false,
  isEditable = false,
  isDeletable = false,
  onDelete = (id) => {},
}) => {
  const history = useHistory();

  const shouldShow = showAll || x.approved;

  return (
    <>
      {shouldShow && (
        <div className="blog__card">
          <img
            src={x.img}
            alt="blog"
            width={300}
            height={300}
            style={{ objectFit: 'cover', aspectRatio: 3 / 2 }}
          />
          <div>
            <h2>{x.title}</h2>
            <small>{`Updated ${x.date}`}</small>
            <h3>{x.subTitle}</h3>
            <p>{`${x.article.substring(0, 100)} . . . . .`}</p>
          </div>
          <div className="blog__btns">
            <Button onClick={() => history.push(`/blog/${x._id}`)}>Read More</Button>

            <div>
              {isEditable && (
                <Button
                  onClick={() =>
                    history.push(`/blog/edit/${x._id}`, {
                      content: x,
                    })
                  }
                >
                  Edit
                </Button>
              )}

              {isDeletable && (
                <Button
                  color="secondary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => onDelete?.(x._id)}
                  type="button"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
