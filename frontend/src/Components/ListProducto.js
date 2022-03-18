import React, { Fragment, useEffect, useState } from "react";

import EditProducto from "./EditProducto";

const ListProducto = () => {
  const [admin, setAdmin] = useState([]);

  /* const elem = window.localStorage.getItem("usuario");
  let usuario = elem ? JSON.parse(elem) : null; */
  //delete todo function

  const deleteProducto = async (id) => {
    try {
      await fetch(`https://provo-backend.herokuapp.com/productos/${id}`, {
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
      const elem = window.localStorage.getItem("usuario");
      const dato = elem ? JSON.parse(elem) : null;

      const response = await fetch(`http://localhost:9000/admin`);
      const jsonData = await response.json();

      setAdmin(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAdmin();
  });

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Admin</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((administrador) => (
            <tr key={administrador.id}>
              <td>{administrador.id}</td>
              <td>{administrador.name_ad}</td>
              <td>
                <EditProducto todo={administrador} />
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
    </Fragment>
  );
};

export default ListProducto;
