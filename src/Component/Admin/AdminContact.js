import React from 'react';
import DashContact from '../Dashboard/DashContact';
// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((r) => r.json());
const AdminContact = ({ allContact }) => {
  //   const { data, error } = useSWR(
  //     `${API_URL}/contact`,
  //     fetcher
  //   );
  return (
    <div className="adminTuition">
      <h3>Contact Request</h3>
      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>MObile</th>
              <th>Message</th>
              <th>Teacher Id</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {allContact.length !== 0 && allContact.map((x) => <DashContact x={x}></DashContact>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContact;
