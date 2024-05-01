import { useHistory, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Blog.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { handleUploadingImg } from '../../utils';
import { API_URL } from '../../constants';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  subTitle: Yup.string().required('Sub Title is required'),
  article: Yup.string().required('Article content is required'),
  // img: Yup.mixed().required('Image is required'),
});

const EditBlog = () => {
  const location = useLocation();
  const history = useHistory();

  const { content = {} } = location.state || {};
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const formHandler = useForm({
    defaultValues: {
      title: content.title,
      subTitle: content.subTitle,
      article: content.article,
      img: content.img,
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formHandler.formState.errors;

  if (!Object.keys(content).length) {
    history.push('/my-blogs');
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const updateBlogContent = async (contentId, newData) => {
    try {
      const response = await fetch(`${API_URL}/blog/update-content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Failed to update content');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  async function onSubmit(data) {
    let payload = { ...content, ...data };
    try {
      setLoading(true);
      if (image) {
        payload.img = await handleUploadingImg(image);
      } else {
        payload.img = content.img;
      }
      await updateBlogContent(content._id, payload);

      history.goBack();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-blogs blog">
      <div className="blog__top">
        <Navigation />
      </div>

      <div className="blog__title">
        <h3>Edit Blog</h3>
      </div>

      <div className="blogPost">
        <form onSubmit={formHandler.handleSubmit(onSubmit)}>
          <input ref={formHandler.register} type="text" name="title" placeholder="Title" />
          {errors?.title && <p className="error">{errors.title.message}</p>}
          <input
            ref={formHandler.register}
            type="text"
            name="subTitle"
            placeholder="Sub Title"
            required
          />
          {errors?.subTitle && <p className="error">{errors.subTitle.message}</p>}
          <label htmlFor="img">Add Image</label>
          <input
            ref={formHandler.register}
            type="file"
            placeholder="Add Image"
            required={!content.img}
            onChange={handleFile}
          />
          {errors?.img && <p className="error">{errors.image.message}</p>}

          {image ? ( // Render image preview if an image is selected
            <div className="img-with-btn">
              <img src={URL.createObjectURL(image)} alt="img" width={200} height={200} />
              <IconButton
                aria-label="delete"
                onClick={() => setImage(null)}
                className="flex-center"
              >
                <DeleteOutline />
              </IconButton>
            </div>
          ) : (
            // Render the existing image if available
            content.img && <img src={content.img} alt="img" width={200} height={200} />
          )}

          <textarea
            ref={formHandler.register}
            name="article"
            id=""
            cols="30"
            rows="10"
            required
            placeholder="Write Something ....."
          />
          {errors?.article && <p className="error">{errors.article.message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditBlog;
