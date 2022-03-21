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

const addingAdmin = async () => {
  const { value: formValues } = await Swal.fire({
    title: "Agrega un administrador",
    html:
      '<input id="swal-input1" placeholder="Identificación" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Nombre" class="swal2-input">' +
      '<input id="swal-input3" type = "password" placeholder="Password" class="swal2-input">' +
      '<input id="swal-input4" placeholder="Email" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value
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
        description: 'Administrador'
      }

      const response = await fetch('https://attendancjyc-backend.herokuapp.com/administrador/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if(response.json){
        Swal.fire('Administrador agregado con Exito');
      }
      else{
        Swal.fire('Administrador no pudo ser agregado');
      }

    } catch (e) {
      
    }
  }
};

const AddAdmin = () => {
  const [nombre, setNombre] = useState("");
  const classes = useStyles();

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
    <Fragment className={classes.wrapIcon}>
      <Fab color="secondary" aria-label="add">
        <AddIcon onClick={addingAdmin}/>
      </Fab>
    </Fragment>
  );
};

export default AddAdmin;
              