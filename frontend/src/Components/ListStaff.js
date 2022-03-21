import React, { Fragment, useEffect, useState } from "react";

import EditStaff from "./EditStaff";

const ListStaff = () => {
  const [staff, setStaff] = useState([]);

  const deleteProducto = async (id) => {
    try {
      await fetch('https://attendancjyc-backend.herokuapp.com/personal/'+id, {
        method: "DELETE",
      }).then(() => {
        setStaff(staff.filter((Staff) => Staff.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getStaff = async () => {
    try {
      const response = await fetch(`https://attendancjyc-backend.herokuapp.com/personal/`);
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
    <Wrapper>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Editar Staff</th>
            <th>Eliminar Staff</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((Personal) => (
            <tr key={Personal.id}>
              <td>{Personal.id}</td>
              <td>{Personal.name_u}</td>
              <td>{Personal.speciality}</td>
              <td>
                <EditStaff todo={Personal} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProducto(Personal.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default ListStaff;