import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const editAdmin = async ( id, datos ) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar administrador",
    html:
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">' +
      '<input id="swal-input4" placeholder="Email" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
      ];
    },
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        nombre: formValues[0] ? formValues[0] : datos.name_u, 
        password: formValues[1] ? formValues[1] : datos.password, 
        email: formValues[2] ? formValues[2] : datos.email,
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/admin/'+id, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Administrador actualizado con Exito');
      }
      else{
        Swal.fire('Administrador no pudo ser actualizado');
      }

    } catch (e) {
      
    }
  }
};


const EditAdmin = (props) => {
  const Wrapper = Fragment;
  return (
    <Wrapper>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${props.todo.id}`}
        onClick={ () => { editAdmin(props.todo.id, props.todo) }}
      >
        Edit
      </button>

    </Wrapper>
  );
};

export default EditAdmin;