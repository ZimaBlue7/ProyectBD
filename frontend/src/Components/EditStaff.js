import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const editStaff = async ( id, datos ) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar staff",
    html:
      '<input id="swal-input1" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Especialidad" class="swal2-input">',
    focusConfirm: false,
    
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        name_s: formValues[0] ? formValues[0] : datos.name_s, 
        speciality: formValues[1] ? formValues[1] : datos.speciality,
      }
      console.log("data ", data);
      const response = await fetch('https://attendancjyc-backend.herokuapp.com/staff/'+id, {
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