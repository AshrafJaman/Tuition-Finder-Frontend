import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
export const TeacherContext = createContext();

export const TeacherList_Context = (props) => {
  const [teacher, setTeacher] = useState([]);
  const [filteredTeacher, setFilteredTeacher] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data);
        setFilteredTeacher(data.filter((t) => t?.isApproved && t.tuition.available));
      });
  }, []);

  function setTeacherList(data) {
    setFilteredTeacher(data.filter((t) => t?.isApproved && t.tuition.available));
  }

  return (
    <TeacherContext.Provider value={[teacher, setTeacher, setTeacherList, filteredTeacher]}>
      {props.children}
    </TeacherContext.Provider>
  );
};
