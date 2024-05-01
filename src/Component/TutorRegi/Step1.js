import React, { useState } from 'react';
import './TutorRegi.css';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storage } from '../FirebaseConfig';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const handleSchema = yup.object().shape({
  fullName: yup.string().required().max(30),
  email: yup.string().required().email(),
  age: yup
    .number()
    .positive("Age can't start with a minus")
    .integer("Age can't include a decimal point")
    .required('Age is Required')
    .typeError('Age must be a number'),
  password: yup.string().required('Password is required').min(6),
  re_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  mobile: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .test('len', 'Must be exactly 11 characters', (val) => val.toString().length === 10)
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .required('A phone number is required'),
  about: yup.string().required('About Is Required').min(10),
  location_1: yup.string().required('Present Location is Required'),
});

const Step1 = ({ count, setPersonal, personal }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(handleSchema),
    defaultValues: {
      ...personal,
    },
  });

  const onSubmit = (data) => {
    if (image) {
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
              //post to database
            });
        }
      );
    } else if (personal.img) {
      data.img = personal.img;
    } else {
      alert('Something Wrong ! Try Again ');
    }
    setPersonal(data);
    count(2);
  };
  const [image, setImage] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      if (e.target.files[0].size >= 1000000) {
        setImgErr('The File Size Is Too Large');
      } else {
        setImgErr(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Step 1</h2>
        <BorderLinearProgress variant="determinate" value={10} />
        <h3>Personal Information:</h3>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            ref={register}
            defaultValue={personal?.fullName}
            style={errors.fullName && { border: '1px solid red' }}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail *"
            defaultValue={personal?.email}
            style={errors.email && { border: '1px solid red' }}
            ref={register}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.fullName?.message}</p>
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            defaultValue={personal?.password}
            style={errors.password && { border: '1px solid red' }}
            ref={register}
          />
          <input
            type="password"
            name="re_password"
            placeholder="Re-Password"
            defaultValue={personal?.re_password}
            style={errors.re_password && { border: '1px solid red' }}
            ref={register}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
          <p style={{ color: 'red' }}>{errors.re_password?.message}</p>
        </div>
        <div>
          <input
            type="number"
            name="mobile"
            placeholder="Enter Your Mobile Number *"
            defaultValue={personal?.mobile}
            style={errors.mobile && { border: '1px solid red' }}
            ref={register}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter Your Age "
            defaultValue={personal?.age}
            style={errors.age && { border: '1px solid red' }}
            ref={register}
          />
          <label htmlFor="gender">Gender:</label>
          <select name="gender" placeholder="Gender" defaultValue="Male">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.mobile?.message}</p>
          <p style={{ color: 'red' }}>{errors.age?.message}</p>
        </div>
        <div>
          <textarea
            name="about"
            rows="3"
            placeholder="About *"
            defaultValue={personal?.about}
            style={errors.about && { border: '1px solid red' }}
            ref={register}
          ></textarea>
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.about?.message}</p>
        </div>
        <div>
          <textarea
            name="location_1"
            rows="3"
            placeholder="Present Location"
            defaultValue={personal?.location_1}
            style={errors.location_1 && { border: '1px solid red' }}
            ref={register}
          ></textarea>
          <textarea
            name="location_2"
            rows="3"
            placeholder="Permanent Address"
            defaultValue={personal?.location_2}
            ref={register}
          ></textarea>
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.location_1?.message}</p>
        </div>
        <div>
          <label>Add Your Image</label>
          <input
            name="img"
            type="file"
            required={personal.img ? false : true}
            onChange={handleFile}
          />
        </div>
        <div>{imgErr && <span style={{ color: 'red' }}>{imgErr}</span>}</div>
        {!image && personal.img && (
          <img src={personal.img} alt="profile" width={200} height={200} />
        )}
      </div>
      <Button type="submit" color="primary" variant="contained" disabled={imgErr}>
        Next
      </Button>
    </form>
  );
};

export default Step1;
