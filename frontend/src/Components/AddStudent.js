import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import Fab from '@mui/material/Fab';
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  wrapIcon: {
    alignItems: "center"
  }
}));

const addingStudent = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Crear un estudiante",
    html:
        '<input id="swal-input1" placeholder="Codigo" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" placeholder="Semestre" class="swal2-input">' +
      '<input id="swal-input4" placeholder="Programa" class="swal2-input">' +
      '<input id="swal-input5" placeholder="Email" class="swal2-input">' ,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
        document.getElementById("swal-input5").value
      ];
    },
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        code: formValues[0], 
        nombre: formValues[1],
        semester: formValues[2], 
        programa: formValues[3],
        email: formValues[4]
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/addstudent/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Estudiante agregado con Exito');
      }
      else{
        Swal.fire('El estudiante no pudo ser creado');
      }

    } catch (e) {
      
    }
  }
};

const AddStudent = () => {
  const classes = useStyles();
  const Wrapper = Fragment;

  return (
    <Wrapper>
      <Fab color="secondary" aria-label="add">
        <AddIcon onClick={addingStudent}/>
      </Fab>
    </Wrapper>
  );
};

export default AddStudent;
              