import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';

import EditProducto from "./EditProducto";

const ListProducto= () => {


  const elem = window.localStorage.getItem('usuario')
  let usuario = elem ? JSON.parse(elem) : null

  const [producto, setProducto] = useState([]);

  //delete todo function

  const deleteProducto = async id => {
    try {
      await fetch(`https://provo-backend.herokuapp.com/productos/${id}`, {
        method: "DELETE"
      }).then(() => {
        setProducto(producto.filter(producto => producto.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProducto = async () => {
    try {

      const elem = window.localStorage.getItem('usuario')
      const dato = elem ? JSON.parse(elem) : null

      const response = await fetch(`https://provo-backend.herokuapp.com/productos/${dato.id}`);
      const jsonData = await response.json();
      console.log(
        jsonData
      )

      setProducto(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducto();
  });

  console.log(producto);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edit</th>
            <th>Carrito</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          
          {producto.map(todo => (
            <tr key={todo.id}>
              <td>{todo.nombre}</td>
              <td>
                <EditProducto todo={todo} />
              </td>
              
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProducto(todo.id)}
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