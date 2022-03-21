import React, { Fragment, useEffect, useState } from "react";
import EditAdmin from "./EditAdmin";
import AddAdmin from "./AddAdmin";

const ListAdmin = () => {
  const [admin, setAdmin] = useState([]);

  /* const elem = window.localStorage.getItem("usuario");
  let usuario = elem ? JSON.parse(elem) : null; */
  //delete todo function

  const deleteProducto = async (id) => {
    try {
      await fetch('https://attendancjyc-backend.herokuapp.com/admin/' + id, {
        method: "DELETE",
      }).then(() => {
        setAdmin(admin.filter((admin) => admin.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAdmin = async () => {
    try {
      const response = await fetch(`https://attendancjyc-backend.herokuapp.com/admin/`);
      const jsonData = await response.json();
      setAdmin(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const autenticarAdmin = async () => {

    const elem = window.localStorage.getItem("usuario");
    const dato = elem ? JSON.parse(elem) : null;

  };

  useEffect(() => {
    getAdmin();
  });

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Admin</th>
            <th>Editar admin</th>
            <th>Delete admin</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((administrador) => (
            <tr key={administrador.id}>
              <td>{administrador.id}</td>
              <td>{administrador.name_u}</td>
              <td>
                <EditAdmin todo={administrador} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProducto(administrador.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAdmin />
    </Fragment>
    
  );
};

export default ListAdmin;
