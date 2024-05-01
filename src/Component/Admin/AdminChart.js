import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { JobsContext } from "../Context/Jobs_Context";
import { TeacherContext } from "../Context/TeacherList_Context";

const AdminChart = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [jobs, setJobs] = useContext(JobsContext);
  const [teacher, setTeacher] = useContext(TeacherContext);

  useEffect(() => {
    setData1([2, 3, teacher.length - 5]);
  }, [teacher]);

  useEffect(() => {
    setData2([1, 2, jobs.length - 3]);
  }, [jobs]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Teachers",
        backgroundColor: "#1665D8",
        borderColor: "#1665D8",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data1,
      },
      {
        label: "Jobs",
        backgroundColor: "#FFCA3A",
        borderColor: "#FFCA3A",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data2,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        width={1}
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                barThickness: 14, // number (pixels) or 'flex'
                maxBarThickness: 14, // number (pixels)
              },
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMin: 50,
                  suggestedMax: 100,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default AdminChart;
