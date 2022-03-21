import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Styles/login.css';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import image from "../Images/back.jpg";
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router-dom';


const TITLE = 'Ingresar'

const StyledBody = styled.div`
  background: linear-gradient(to bottom, rgba(172, 3, 31, 0.918), rgba(124, 47, 60, 0.856), rgba(255, 255, 255, 0.596)),
    url(${image});  
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;


function Copyright(props) {
  return (
    <Typography variant="body2" color="common.white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Attendance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [body, setBody] = useState({ usuario: '', password: '' });

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const elem = window.localStorage.getItem("usuario");
      const dato = elem ? JSON.parse(elem) : null;
      try {
        const response = await fetch('https://attendancjyc-backend.herokuapp.com/login/', {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(body), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        });
        console.log("response ", response);
        if(response.json){
          Swal.fire('Bienvenido: ', body.usuario);
        }else{
          Swal.fire('El usuario no existe');
        }
  
      } catch (err) {
        console.error(err.message);
      }
  };

  return (
    <StyledBody>
      <Helmet><title>{TITLE}</title> </Helmet>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="icons8-lock"></div>
            <Typography component="h1" variant="h5" color="common.white">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Email Address"
                name="usuario"
                autoComplete="email"
                autoFocus
                value={body.usuario}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={body.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="common.white">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" color="common.white">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </StyledBody>
  );
}