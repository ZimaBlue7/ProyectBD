import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import Fab from '@mui/material/Fab';
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@mui/icons-material/Home';
const useStyles = makeStyles(() => ({
  wrapIcon: {
    alignItems: "center"
  }
}));

const home = () =>{
  window.location = "/staff";
}

const addingStaff = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agrega un staff",
    html:
      '<input id="swal-input1" placeholder="Identificación" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">' +
      '<input id="swal-input4" placeholder="Email" class="swal2-input">'+
      '<input id="swal-input5" placeholder="Especialidad" class="swal2-input">',
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
        identificacion: formValues[0], 
        nombre: formValues[1], 
        password: formValues[2], 
        email: formValues[3], 
        description: 'Profesor',
        especialidad: formValues[4], 
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/administrador/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Personal agregado con Exito');
      }
      if(formValues[0] === "" || formValues[1] === "" || formValues[2] === null || formValues[3] === ""){
        Swal.fire('Personal no pudo ser agregado');
      }

    } catch (e) {
      
    }
  }
};

const AddStaff = () => {
  const [nombre, setNombre] = useState("");
  const classes = useStyles();

  const Wrapper = Fragment;
  return (
    <Wrapper>
      <Fab color="secondary" aria-label="add">
        <AddIcon onClick={addingStaff}/>
      </Fab>
      <Fab color="primary">
      <HomeIcon onClick={home}/>
      </Fab>
    </Wrapper>
  );
};

export default AddStaff;
              