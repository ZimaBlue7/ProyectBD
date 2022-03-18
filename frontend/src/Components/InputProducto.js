import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import "../Styles/Inventario/inventario.css";

const myFunction = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html:
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
    /*try {
      const body = {
        id: formValues[0],
        nombre: formValues[1],
      };*/
    console.log("body ", formValues[0], " name ", formValues[1]);
    /*const response = await fetch("http://localhost:4000/adadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);*/

    //window.location = "/admin";
    /*} catch (err) {
      console.error(err.message);
    }*/
  }
};

const InputProducto = () => {
  const [nombre, setNombre] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const elem = window.localStorage.getItem("usuario");
    const dato = elem ? JSON.parse(elem) : null;

    try {
      const body = {
        id_usuario: dato.id,
        nombre: nombre,
      };
      console.log(" name ", nombre);
      const response = await fetch("http://localhost:4000/adadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);

      window.location = "/admin";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form className="d-flex justify-content-center" onSubmit={onSubmitForm}>
        <button class="btn btn-primary btn-lg" onClick={myFunction}>
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputProducto;

/* 
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>  
      </form>
      <input
          type="text"
          className="form-group "
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
       <small id="emailHelp" class="form-text text-muted">Insert the product in your inventary.</small> */
