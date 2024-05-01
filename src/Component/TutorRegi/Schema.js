import * as yup from "yup";
const Schema = yup.object().shape({
  fullName: yup.string().required().max(20),
  email: yup.string().required().email(),
  age: yup
    .number()
    .positive("Age can't start with a minus")
    .integer("Age can't include a decimal point")
    .required("Age is Required")
    .typeError("Age must be a number"),
  password: yup.string().required("Password is required").min(6),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  mobile: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .test(
      "len",
      "Must be exactly 11 characters",
      (val) => val.toString().length === 10
    )
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .required("A phone number is required"),
  about: yup.string().required("About Is Required").min(10),
  location_1: yup.string().required("Present Location is Required"),
  institution: yup.string().required("Institution Is Required"),
  subject: yup.string().required("Subject Is Required"),
  high_degree: yup.string().required("Highest Qualification Is Required"),
  ssc: yup.string().required("This Field is Required"),
  ssc_inst: yup.string().required("Institute Is Required"),
  ssc_year: yup.string().required("Year Is Required"),
  ssc_group: yup.string().required("Group Is Required"),
  ssc_gpa: yup.string().required("GPA is Required"),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is Required"),
  img: yup
    .mixed()
    .required("You need to provide a file !")
    .test("fileSize", "The file is too large", (val) => {
      return val && val[0].size <= 1000000;
    }),
});
export default Schema;
