import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const editCourse = async ( id, datos ) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar curso",
    html:
      '<input id="swal-input1" placeholder="nombre"  class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value
      ];
    },
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {
      const data = {
        name: formValues[0] ? formValues[0] : datos.name_co
      }
      const response = await fetch('https://attendancjyc-backend.herokuapp.com/course/'+id, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Curso actualizado con Exito');
      }
      else{
        Swal.fire('Curso no pudo ser actualizado');
      }

    } catch (e) {
      
    }
  }
};


const EditCourse = (props) => {
  const Wrapper = Fragment;
  return (
    <Wrapper>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${props.todo.id}`}
        onClick={ () => { editCourse(props.todo.id, props.todo) }}
      >
        Edit
      </button>
    </Wrapper>
  );
};

export default EditCourse;