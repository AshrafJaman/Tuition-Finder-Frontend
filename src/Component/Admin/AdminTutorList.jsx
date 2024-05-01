import './AdminTuition.css';
import TutorsTable from '../Dashboard/TutorsTable';
import { API_URL } from '../../constants';
import { TeacherContext } from '../Context/TeacherList_Context';
import { useContext } from 'react';

const AdminTutorList = ({ tutors, setTutors, handleSnack }) => {
  const [, , setTeacherList] = useContext(TeacherContext);

  async function handleApprovedOrDiscard(tutor) {
    const tutorId = tutor._id;
    const isApproved = !tutor.isApproved;
    const url = `${API_URL}/update/tutorApproval/${tutorId}`;

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ isApproved }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update approval status');
      }

      handleSnack('Updated Successfully');

      const newArr = tutors.map((cur) => {
        if (cur._id === tutor._id) {
          return {
            ...cur,
            isApproved,
          };
        } else {
          return cur;
        }
      });

      setTutors(newArr);

      setTeacherList(newArr);
    } catch (error) {
      console.error('Error approving/discarding tutor:', error);
      handleSnack('Something went wrong');
    }
  }

  async function handleDeleteTutor(tutor) {
    const tutorId = tutor._id;
    const url = `${API_URL}/delete/tutors/${tutorId}`;

    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      const newArr = tutors.filter((t) => t._id !== tutorId);

      setTutors(newArr);
      setTeacherList(newArr);
      handleSnack('Deleted Successfully');
    } catch (error) {
      console.error('Error deleting tutor', error);
      handleSnack('Something went wrong');
    }
  }

  return (
    <div className="adminTuition">
      <h3>Tutor List</h3>

      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {tutors.length !== 0 &&
              tutors.map((tutor, idx) => (
                <TutorsTable
                  key={idx}
                  tutor={tutor}
                  handleApprovedOrDiscard={handleApprovedOrDiscard}
                  handleDeleteTutor={handleDeleteTutor}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminTutorList;
