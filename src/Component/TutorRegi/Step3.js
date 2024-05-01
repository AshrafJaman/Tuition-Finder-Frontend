import { Button, MenuItem, Select, Snackbar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import PaypalExpressBtn from "react-paypal-express-checkout";
import * as yup from "yup";
import { auth } from "../FirebaseConfig";
import { UserContext } from "../Context/Sign_In_Context";
import { TeacherContext } from "../Context/TeacherList_Context";
import { API_URL } from "../../constants";
import { Alert } from "@material-ui/lab";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const handleSchema = yup.object().shape({
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is Required"),
});

const subjects = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "English",
  "Geology",
  "Economics",
  "Accounting",
  "Marketing",
  "Finance",
];

const Step3 = ({ count, personal, education, tuition, isEditing, tutorId }) => {
  const [, setUser] = useContext(UserContext);
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [subject, setSubject] = useState(
    tuition.tutor_subject
      ? { ...tuition.tutor_subject }
      : {
          math: false,
          physics: false,
          chemistry: false,
          biology: false,
          history: false,
          english: false,
          geology: false,
          economics: false,
          accounting: false,
          marketing: false,
          finance: false,
        }
  );

  const [snack, setSnack] = useState(null);

  function handleSnackMessage(msg) {
    setSnack(msg);
  }
  function handleSnackClose() {
    setSnack(null);
  }

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(handleSchema),
    defaultValues: {
      ...tuition,
    },
  });

  async function createTutorWithInfo(data) {
    auth
      .createUserWithEmailAndPassword(personal.email, personal.password)
      .then((res) => {
        const { email } = res.user;
        const updateUser = {
          isSignIn: true,
          email: email,
        };
        setUser(updateUser);
        handlePost(data);
      })
      .catch((error) => {
        setSpin(false);
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        personal: personal,
        education: education,
        tuition: {
          ...data,
          star: isEditing ? tuition?.star : 0,
          comments: isEditing ? tuition?.comments : [],
          available: isEditing ? (data.status === "true" ? true : false) : true,
          member: isEditing ? tuition?.member : member ? true : false,
          tutor_subject: subject,
        },
      };

      setSpin(true);

      if (isEditing) {
        handleUpdate(payload);
      } else {
        await createTutorWithInfo(payload);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setSpin(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const url = `${API_URL}/update/tutor-information/${tutorId}`;

      const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const jsonRes = await res.json();

      if (jsonRes.status) {
        const updatedData = teacher.map((t) => {
          if (t._id === jsonRes.data._id) {
            return jsonRes.data;
          } else {
            return t;
          }
        });

        setTeacher(updatedData);

        handleSnackMessage("Updated Successfully");
      } else {
        handleSnackMessage(jsonRes?.message || "Something went wrong");
      }
    } catch (error) {
      handleSnackMessage("Could not update the information");
    }
  };

  const handlePost = (data) => {
    fetch(`${API_URL}/post/reg`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((json) => {
        count(4);
        setSpin(false);
        const newArr = [...teacher, data];
        setTeacher(newArr);
      });
  };

  const [spin, setSpin] = useState(false);

  const handleSubjectChange = (e) => {
    const name = e.target.name;
    if (e.target.checked) {
      const dup = { ...subject };
      dup[name] = e.target.checked;

      setSubject(dup);
    } else {
      const dup = { ...subject };
      dup[name] = e.target.checked;
      setSubject(dup);
    }
  };
  const client = {
    sandbox:
      "ARumogbdoLmSlPkL_zC41SjxA1oETyuZzTuj4qn9lcaQRjv-zEe0HO5H4cX5G-7Yxd_A4G3OpOOrl2cJ",
    production: "YOUR-PRODUCTION-APP-ID",
  };

  let env = "sandbox";

  const [member, setMember] = useState(tuition?.member || false);

  const onSuccess = (payment) => {
    setMember(true);
  };

  const onError = (err) => {
    alert(err);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* educational history */}
        <div>
          <h2>Step 3</h2>
          <BorderLinearProgress variant="determinate" value={90} />
          <h3>Tuition Information</h3>
          <div>
            <label htmlFor="">I can teach:</label>
            {subjects.map((subject, index) => (
              // <div key={index}>
              //   <input
              //     type="checkbox"
              //     name={subject.toLowerCase()}
              //     onChange={handleSubjectChange}
              //     defaultChecked={tuition.tutor_subject[subject.toLowerCase()] === true}
              //     ref={register}
              //   />{' '}
              //   <label htmlFor={subject.toLowerCase()}>{subject}</label>
              // </div>
              <div key={index}>
                <input
                  type="checkbox"
                  name={subject.toLowerCase()}
                  onChange={handleSubjectChange}
                  defaultChecked={
                    tuition.tutor_subject &&
                    tuition.tutor_subject[subject.toLowerCase()] === true
                  } //chatgpt replaced
                  // defaultChecked={tuition.tutor_subject[subject.toLowerCase()] === true}
                  ref={register}
                />{" "}
                <label htmlFor={subject.toLowerCase()}>{subject}</label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="days_per_week">Days Per Week</label>
            <select name="days_per_week" ref={register}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <input
              type="number"
              placeholder="Salary Per Month"
              name="salary"
              ref={register}
              style={errors.salary && { border: "1px solid red" }}
            />
          </div>
          <div>
            <p style={{ color: "red" }}>{errors.days_per_week?.message}</p>
            <p style={{ color: "red" }}>{errors.salary?.message}</p>
          </div>
          <div>
            <input
              type="text"
              name="video"
              placeholder="Your Demo Video Lecture link"
              ref={register}
            />
            <label htmlFor="prefer_class">Preferred Classes</label>
            <select
              name="prefer_class"
              defaultValue={tuition?.prefer_class || "Any"}
              ref={register}
            >
              <option value="Any">Any Class</option>
              <option value="Class 1 - Class 5">Class 1 - Class 5</option>
              <option value="Class 1 - Class 9">Class 1 - Class 9</option>
              <option value="Class 5 - Class 9">Class 5 - Class 9</option>
              <option value="SSC/DAKHIL/A-LABEL">SSC/ DAKHIL / A-LABEL</option>
              <option value="HSC/ALIM/O-LABEL">HSC / ALIM / O-LABEL</option>
            </select>
            <label htmlFor="medium">Preferred Medium :</label>
            <select name="medium" defaultValue="Bangle" ref={register}>
              <option value="Bangle">Bangla</option>
              <option value="English">English</option>
              <option value="Both">Both</option>
            </select>

            {isEditing && (
              <>
                <label htmlFor="medium">Available :</label>
                <select
                  name="status"
                  ref={register}
                  defaultValue={tuition?.available}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </select>
              </>
            )}
          </div>
        </div>
        {/* <div>
          <h4>Want to be a premiere member?</h4>
          <p></p>
          {member ? (
            <h2 style={{ color: "green" }}>
              Congratulations Your Payment Successfully Paid
            </h2>
          ) : (
            <PaypalExpressBtn
              env={env}
              client={client}
              currency={"USD"}
              total={10}
              onError={onError}
              onSuccess={onSuccess}
            />
          )}
        </div> */}
        {spin ? (
          <section style={{ background: "white", padding: "10px" }}>
            <CircularProgress color="primary" />
          </section>
        ) : (
          <div className="two_btn">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => count(2)}
              disabled={spin}
            >
              Back
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={spin}
            >
              {spin && (
                <CircularProgress
                  color="inherit"
                  size={20}
                  style={{ marginRight: "10px" }}
                />
              )}
              {isEditing ? "Save Changes" : "Submit"}
            </Button>
          </div>
        )}
      </form>

      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Step3;
