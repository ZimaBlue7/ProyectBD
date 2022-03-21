import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const editStaff = async ( id, datos ) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar administrador",
    html:
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">' +
      '<input id="swal-input4" placeholder="Especialidad" class="swal2-input">',
    focusConfirm: false,
    
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        nombre: formValues[0] ? formValues[0] : datos.name_u, 
        password: formValues[1] ? formValues[1] : datos.password, 
        speciality: formValues[2] ? formValues[2] : datos.speciality,
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/personal/'+id, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Staff actualizado con Exito');
      }
      else{
        Swal.fire('Staff no pudo ser actualizado');
      }

    } catch (e) {
      
    }
  }
};


const EditStaff = (props) => {
        
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${props.todo.id}`}
        onClick={ () => { editStaff(props.todo.id, props.todo) }}
      >
        Edit
      </button>

    </Fragment>
  );
};

export default EditStaff;