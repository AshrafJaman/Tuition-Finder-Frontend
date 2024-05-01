import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Sign_In_Context } from "./Component/Context/Sign_In_Context";
import { TeacherList_Context } from "./Component/Context/TeacherList_Context";
import { Jobs_Context } from "./Component/Context/Jobs_Context";
import { Blogs_Context } from "./Component/Context/Blogs_Context";
ReactDOM.render(
  <React.StrictMode>
    <Sign_In_Context>
      <TeacherList_Context>
        <Jobs_Context>
          <Blogs_Context>
            <App />
          </Blogs_Context>
        </Jobs_Context>
      </TeacherList_Context>
    </Sign_In_Context>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
