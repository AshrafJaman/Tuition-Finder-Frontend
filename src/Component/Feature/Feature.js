// import { Modal, Snackbar } from "@material-ui/core";
// import React from "react";
// import { Link } from "react-router-dom";
// import ContactForm from "../ContactForm/ContactForm";
// import { makeStyles } from "@material-ui/core/styles";
// import MuiAlert from "@material-ui/lab/Alert";
// import "./Feature.css";
// import { useState } from "react";
// import Fab from "@material-ui/core/Fab";

// import CloseIcon from "@material-ui/icons/Close";
// const useStyles = makeStyles((theme) => ({
//   large: {
//     width: theme.spacing(30),
//     height: theme.spacing(30),
//     margin: "40px 0px 5px 0px",
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// }));
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// const Feature = () => {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [snack, setSnack] = useState(false);
//   const [contact, setContact] = useState(true);
//   const handleSnackClose = () => {
//     setSnack(false);
//   };
//   const handleOpen = (i) => {
//     setOpen(true);
//     setContact(i);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleSnack = (msg) => {
//     setSnack(msg);
//   };
//   return (
//     <>
//       <div className="featurecard">
//         <img
//           className="featurecard-header"
//           src="https://venturebeat.com/wp-content/uploads/2020/05/IMG_3107-e1588965032907.jpeg"
//           alt="Woman typing on keyboard with glowing keys"
//         />
//         <article className="featurecard-body">
//           <p className="featurecard-title">
//             Get instant help with your homework
//           </p>
//           <p className="featurecard-text">
//             Our online tutors are always available. We’ve selected the best
//             tutors from thousands of qualified educators. We find the best
//             tutors, so you can get help when you need it!
//           </p>
//           <button
//             className="btn_feature"
//             onClick={() => {
//               handleOpen("emailUs");
//             }}
//             style={{ color: "#0866FF" }}
//           >
//             Enter your question
//           </button>
//         </article>
//         <Modal className={classes.modal} open={open} onClose={handleClose}>
//           <div className="modal">
//             <div>
//               <div>
//                 <Link to="/">
//                   {" "}
//                   <h2 style={{ fontSize: "35px" }}>Tuition Finder</h2>
//                 </Link>
//                 <h3>
//                   <i>Thanks For Your Interest</i>
//                 </h3>
//               </div>
//             </div>
//             <div className="close__modal__boss">
//               <span className="close__modal" onClick={handleClose}>
//                 <CloseIcon></CloseIcon>
//               </span>
//               <ContactForm
//                 contact={contact}
//                 handleClose={handleClose}
//                 handleSnack={handleSnack}
//               ></ContactForm>
//             </div>
//           </div>
//         </Modal>
//         <Snackbar
//           open={snack}
//           autoHideDuration={4000}
//           onClose={handleSnackClose}
//         >
//           <Alert severity="success" onClose={handleSnackClose}>
//             {snack}
//           </Alert>
//         </Snackbar>
//       </div>
//     </>
//   );
// };

// export default Feature;
