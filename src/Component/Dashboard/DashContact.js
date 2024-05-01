import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const DashContact = ({ x }) => {
  return (
    <>
      <tr>
        <td>{x.name}</td>
        <td>{x.email}</td>
        <td>{x.mobile}</td>
        <td>{x.message}</td>
        <td>
          {x.teacherId && (
            <Link to={`/profile/${x.teacherId}`}>
              <Button color="primary" variant="contained">
                Teacher Profile
              </Button>
            </Link>
          )}
        </td>
      </tr>
    </>
  );
};

export default DashContact;
