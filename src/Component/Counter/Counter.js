import React, { useContext } from "react";
import "./Counter.css";
import CountUp from "react-countup";
import { TeacherContext } from "../Context/TeacherList_Context";
import { JobsContext } from "../Context/Jobs_Context";
const Counter = () => {
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [jobs, setJobs] = useContext(JobsContext);
  return (
    <div className="counter">
      <CountUp start={0} end={teacher.length} delay={0} duration={5}>
        {({ countUpRef }) => (
          <div>
            <div>
              <div>
                <span ref={countUpRef} />
                <span>+</span>
              </div>
              <p>TOTAL TUTOR</p>
            </div>
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={11} delay={0} duration={5}>
        {({ countUpRef }) => (
          <div>
            <div>
              <div>
                <span ref={countUpRef} />
                <span>+</span>
              </div>
              <p>TOTAL SUBJECT</p>
            </div>
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={jobs.length} delay={0} duration={5}>
        {({ countUpRef }) => (
          <div>
            <div>
              <div>
                <span ref={countUpRef} />
                <span>+</span>
              </div>
              <p>TOTAL JOBS</p>
            </div>
          </div>
        )}
      </CountUp>
    </div>
  );
};

export default Counter;
