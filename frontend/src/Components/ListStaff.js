import React, { Fragment, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import EditStaff from "./EditStaff";

const ListStaff = () => {
  const [staff, setStaff] = useState([]);

  const deleteStaff = async (id) => {
    try {
      await fetch('https://attendancjyc-backend.herokuapp.com/personal/'+id, {
        method: "DELETE",
      }).then(() => {
        setStaff(staff.filter((staff) => staff.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getStaff = async () => {
    try {
      const response = await fetch(`https://attendancjyc-backend.herokuapp.com/staff/`);
      const jsonData = await response.json();
      setStaff(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getStaff();
  });
  const Wrapper = Fragment;
  return (
    <HelmetProvider>
    <Wrapper>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          
          {staff.map((staffS, idx) => (
            <tr key={idx}>
              <td>{staffS.id}</td>
              <td>{staffS.name_s}</td>
              <td>{staffS.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
    </HelmetProvider>
  );
};

export default ListStaff;