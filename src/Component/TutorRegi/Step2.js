import React from 'react';
import './TutorRegi.css';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
  institution: yup.string().required('Institution Is Required'),
  subject: yup.string().required('Subject Is Required'),
  high_degree: yup.string().required('Highest Qualification Is Required'),
  ssc: yup.string().required('This Field is Required'),
  ssc_inst: yup.string().required('Institute Is Required'),
  ssc_year: yup.string().required('Year Is Required'),
  ssc_group: yup.string().required('Group Is Required'),
  ssc_gpa: yup.string().required('GPA is Required'),
});

const Step2 = ({ count, setEducation, education }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(handleSchema),
    defaultValues: {
      ...education,
    },
  });
  const onSubmit = (data) => {
    setEducation(data);
    count(3);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Step 2</h2>
        <BorderLinearProgress variant="determinate" value={50} />
        <h3>Educational Information:</h3>
        <div>
          <input
            type="text"
            name="institution"
            placeholder="Current Institution"
            defaultValue={education?.institution}
            style={errors.institution && { border: '1px solid red' }}
            ref={register}
          />
          <input
            type="text"
            name="subject"
            style={errors.subject && { border: '1px solid red' }}
            placeholder="Current Studying Subject"
            ref={register}
            defaultValue={education?.institution}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.institution?.message}</p>
          <p style={{ color: 'red' }}>{errors.subject?.message}</p>
        </div>
        <div>
          <input
            type="text"
            name="high_degree"
            style={errors.high_degree && { border: '1px solid red' }}
            placeholder="Highest Qualification /Degree"
            ref={register}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.high_degree?.message}</p>
        </div>
        <div>
          <label htmlFor="">Your SSC / O-label Information :</label>
          <select name="ssc" defaultValue="SSC" ref={register}>
            <option value="SSC">SSC</option>
            <option value="O-LABEL">O-LABEL</option>
            <option value="DAKHIL">DAKHIL</option>
          </select>
          <input
            type="text"
            name="ssc_inst"
            style={errors.ssc_inst && { border: '1px solid red' }}
            placeholder="Institute"
            ref={register}
          />
          <input
            type="number"
            name="ssc_year"
            style={errors.ssc_year && { border: '1px solid red' }}
            placeholder="Year"
            ref={register}
          />
          <input
            type="text"
            name="ssc_group"
            style={errors.ssc_group && { border: '1px solid red' }}
            placeholder="Group"
            ref={register}
          />
          <input
            type="text"
            name="ssc_gpa"
            style={errors.ssc_gpa && { border: '1px solid red' }}
            placeholder="GPA"
            ref={register}
          />
        </div>
        <div>
          <p style={{ color: 'red' }}>{errors.high_degree?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc_inst?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc_year?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc_group?.message}</p>
          <p style={{ color: 'red' }}>{errors.ssc_gpa?.message}</p>
        </div>
        <div>
          <label htmlFor="">Your HSC / A-label Information :</label>
          <select name="hsc" ref={register}>
            <option value="HSC">HSC</option>
            <option value="O-LABEL">A-LABEL</option>
            <option value="DAKHIL">ALIM</option>
          </select>
          <input type="text" name="hsc_inst" placeholder="Institute" ref={register} />
          <input type="number" name="hsc_year" placeholder="Year" ref={register} />
          <input type="text" name="hsc_group" placeholder="Group" ref={register} />
          <input type="text" name="hsc_gpa" placeholder="GPA" ref={register} />
        </div>
        <div>
          <label htmlFor="">Your HONOURS Information :</label>
          <input type="text" name="hon_inst" placeholder="Institute" ref={register} />
          <input type="number" name="hon_year" placeholder="Year" ref={register} />
          <input type="text" name="hon_dept" placeholder="Department" ref={register} />
          <input type="text" name="hon_cgpa" placeholder="CGPA" ref={register} />
        </div>
      </div>
      <div className="two_btn">
        <Button color="secondary" variant="contained" onClick={() => count(1)}>
          Back
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step2;
