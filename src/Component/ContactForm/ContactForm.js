import { Button, MenuItem, Select, TextareaAutosize, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import './ContactForm.css';
import { useForm } from 'react-hook-form';
import { TeacherContext } from '../Context/TeacherList_Context';
import { UserContext } from '../Context/Sign_In_Context';
import { API_URL } from '../../constants';
const ContactForm = ({
  handleClose,
  handleSnack,
  contact,
  profile,
  id,
  comments,
  star,
  contacts,
  setPro,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [rate, setRate] = React.useState('');
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [tempo, setTempo] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const handleEmailUs = (e) => {
    handleContactPost({
      name: e.target[0].value,
      email: e.target[1].value,
      mobile: e.target[2].value,
      message: e.target[3].value,
      teacherId: null,
    });
    handleClose();
    handleSnack('Thanks For With Us');
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (contacts) {
      const ase = [
        ...contacts,
        {
          name: e.target[0].value,
          email: e.target[1].value,
          mobile: e.target[2].value,
          message: e.target[3].value,
        },
      ];
      fetch(`${API_URL}/update/tutor/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(ase),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.text())
        .then((json) => {
          ase.teacherId = id;
          handleContactPost({
            name: e.target[0].value,
            email: e.target[1].value,
            mobile: e.target[2].value,
            message: e.target[3].value,
            teacherId: id,
          });
        });
      setTempo(ase);
    } else {
      const ham = [
        {
          name: e.target[0].value,
          email: e.target[1].value,
          mobile: e.target[2].value,
          message: e.target[3].value,
        },
      ];
      console.log(ham);
      setTempo(ham);
      fetch(`${API_URL}/update/tutor/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(ham),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.text())
        .then((json) => {
          console.log(json);
          ham.teacherId = id;
          handleContactPost({
            name: e.target[0].value,
            email: e.target[1].value,
            mobile: e.target[2].value,
            message: e.target[3].value,
            teacherId: id,
          });
        });
    }
    handleClose();
    handleSnack("Thanks ! We'll contact with you As soon as Possible ");
  };
  // review
  const handleReview = (e) => {
    e.preventDefault();
    const dup = [
      ...comments,
      {
        name: e.target[0].value,
        rating: rate,
        feedback: e.target[2].value,
      },
    ];
    fetch(`${API_URL}/update/feedback/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        rate: (star * (dup.length - 1) + rate) / dup.length,
        comments: dup,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => {
        const newArr = teacher.filter((x) => {
          if (x._id === id) {
            x.tuition.star = (x.tuition.star * (dup.length - 1) + rate) / dup.length;
            x.tuition.comments = dup;
            return x;
          } else {
            return x;
          }
        });
        setTeacher(newArr);
      });
    handleClose();
    handleSnack('Thanks For Your Feedback');
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const update = {
      fullName: e.target[0].value,
      mobile: e.target[1].value,
      video: e.target[2].value,
      available: e.target[3].value,
      about: e.target[4].value,
    };
    fetch(`${API_URL}/update/myProfile/${user.email}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => {
        const newArr = teacher.filter((x) => {
          if (x.personal.email === user.email) {
            x.personal.fullName = update.fullName;
            x.personal.mobile = update.mobile;
            x.personal.about = update.about;
            return x;
          } else {
            return x;
          }
        });
        setTeacher(newArr);
      });
    // console.log(update);
    handleClose();
    handleSnack('Update Successfully');
  };
  const handleChange = (event) => {
    setRate(event.target.value);
  };
  const handleContactPost = (data) => {
    console.log(data);
    fetch(`${API_URL}/post/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => console.log(json));
  };
  return (
    <div className="form">
      {contact === 'contact' && (
        <form onSubmit={handleForm}>
          <TextField error={false} id="input1" label="Full Name" />
          <TextField error={false} id="input2" label="Email" />
          <TextField error={false} id="input3" label="Mobile Number" />
          <TextField error={false} id="input3" label="Your Message" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      )}
      {contact === 'emailUs' && (
        <form onSubmit={handleEmailUs}>
          <TextField error={false} id="input1" label="Full Name" />
          <TextField error={false} id="input2" label="Email" />
          <TextField error={false} id="input3" label="Mobile Number" />
          <TextField error={false} id="input3" label="Your Message" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      )}
      {contact === 'feedback' && (
        <form onSubmit={(e) => handleReview(e)}>
          <TextField error={false} name="name" label="Full Name" ref={register} />
          <Select value={rate} onChange={handleChange} required>
            <MenuItem value={1}>1 - Poor</MenuItem>
            <MenuItem value={2}>2 - Average</MenuItem>
            <MenuItem value={3}>3 - Good</MenuItem>
            <MenuItem value={4}>4 - Very Good</MenuItem>
            <MenuItem value={5}>5 - Excellent</MenuItem>
          </Select>
          <TextField
            error={false}
            name="feedback"
            label="Give a Feedback"
            required
            ref={register}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      )}
      {contact === 'update' && (
        <form onSubmit={handleUpdate}>
          <TextField
            error={false}
            id="input1"
            label="Full Name"
            required
            defaultValue={profile?.personal?.fullName}
          />
          <TextField
            error={false}
            id="input1"
            label="Mobile"
            required
            defaultValue={profile?.personal?.mobile}
          />
          <TextField
            error={false}
            id="input1"
            label="Demo Lecture Link"
            defaultValue={profile?.tuition?.video}
          />
          <Select label="Status" defaultValue={profile?.tuition?.available} required>
            <MenuItem value={true}>Available</MenuItem>
            <MenuItem value={false}>Not Available</MenuItem>
          </Select>
          <TextareaAutosize
            rowsMin={3}
            error={false}
            id="input1"
            label="About"
            required
            defaultValue={profile?.personal?.about}
          />
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
