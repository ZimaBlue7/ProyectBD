import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const editStudent = async ( id, datos ) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar estudiante",
    html:
      '<input id="swal-input2" placeholder="Programa" class="swal2-input">' +
      '<input id="swal-input3" placeholder="Semester" class="swal2-input">' ,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value
      ];
    },
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        programa: formValues[0] ? formValues[0] : datos.programa, 
        semester: formValues[1] ? formValues[1] : datos.semester
      }

      console.log("data ",data);

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/students/'+id, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Estudiante actualizado con Exito');
      }
      else{
        Swal.fire('Estudiante no pudo ser actualizado');
      }

    } catch (e) {
      
    }
  }
};


const EditStudent = (props) => {
  const Wrapper = Fragment;
  return (
    <Wrapper>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${props.todo.code}`}
        onClick={ () => { editStudent(props.todo.code, props.todo) }}
      >
        Edit
      </button>

    </Wrapper>
  );
};

export default EditStudent;