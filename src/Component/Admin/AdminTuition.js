import React, { useContext } from 'react';
import DashTable from '../Dashboard/DashTable';
import './AdminTuition.css';
import { API_URL } from '../../constants';
import { JobsContext } from '../Context/Jobs_Context';
const AdminTuition = ({ allTuition, setAllTuition, handleSnack }) => {
  const [jobs, setJobs] = useContext(JobsContext);

  const handleDelete = (id) => {
    const newArr = allTuition.filter((x) => x._id !== id);

    setAllTuition(newArr);

    handleSnack('Tuition Job Deleted Successfully');

    alert('Deleted Successfully');

    fetch(`${API_URL}/delete/jobs/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((json) => console.log(json));

    setJobs(() => jobs.filter((job) => job._id !== id));
  };

  async function handleApprovedOrDiscard(x) {
    const isApproved = !x?.isApproved;
    const url = `${API_URL}/post/update/${x._id}`;

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          isApproved,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update post approval status');
      }

      const newArr = allTuition.map((cur) => {
        if (cur._id === x._id) {
          return {
            ...cur,
            isApproved,
          };
        } else {
          return cur;
        }
      });
      setAllTuition(newArr);
      setJobs(() => [{ ...x, isApproved: true }, ...jobs]);
    } catch (error) {
      console.error('Error approving/discarding post:', error);
    }
  }

  return (
    <div className="adminTuition">
      <h3>Tuition</h3>
      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Applied By</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {allTuition.length !== 0 &&
              allTuition.map((x, index) => (
                <DashTable
                  key={index}
                  x={x}
                  handleDelete={handleDelete}
                  handleApprovedOrDiscard={handleApprovedOrDiscard}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTuition;
