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

const addingCourse = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Crear un curso",
    html:
      '<input id="swal-input1" placeholder="Codigo del curso" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" placeholder="Codigo profesor encargado" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value
      ];
    },
  });

  if (formValues) {
    Swal.fire('Datos ingresados');
    try {

      const data = {
        id: formValues[0], 
        name_co: formValues[1], 
        id_staff: formValues[2]
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/addcourse/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Curso agregado con Exito');
      }
      else{
        Swal.fire('El curso no pudo ser creado');
      }

    } catch (e) {
      
    }
  }
};

const AddCourse = () => {
  const classes = useStyles();
  const Wrapper = Fragment;

  return (
    <Wrapper>
      <Fab color="secondary" aria-label="add">
        <AddIcon onClick={addingCourse}/>
      </Fab>
    </Wrapper>
  );
};

export default AddCourse;
              