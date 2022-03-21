
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import QuizIcon from '@mui/icons-material/Quiz';
import WidgetsIcon from '@mui/icons-material/Widgets';
import "../Styles/admin.css";
import Swal from "sweetalert2";
import AddStaff from "../Components/AddStaff.js";
import ListStaff from "../Components/ListStaff.js";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import image from "../Images/fondo.png";
import styledt from 'styled-components';
import { Helmet } from 'react-helmet'
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const TITLE = 'Personal'

const StyledBody = styledt.div`
  background: url(${image});  
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;
const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
	root: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'auto',
		backgroundPosition: 'center',
		height: '100vh',
	},
	typography: {
		color: "#000000",
		borderColor: "thistle",
		fontFamily: 'Open Sans Condensed'
	},
	icon: {
		color: "#000000",
		fontSize: "20em"
	}
	  
}));


const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));



const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

function Copyright(props) {
	return (
	  <Typography variant="body2" color="common.white" align="center" {...props}>
		{"Copyright © "}
		<Link color="inherit" href="https://mui.com/">
		  Attendance
		</Link>{" "}
		{new Date().getFullYear()}
		{"."}
	  </Typography>
	);
  }

export default function Staff() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const classes = useStyles()
	 
	const handleSubmit = async (e) =>{
	
        
    };
	const home = () =>{
        window.location = "/staff";
    };


	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const enrollStudent = async () => {
		const { value: formValues } = await Swal.fire({
			title: 'Agregar estudiante',
			html:
			  '<input id="swal-input1"  placeholder="Nombre estudiante" class="swal2-input">' +
			  '<input id="swal-input2"  placeholder="Codigo estudiante" class="swal2-input">',
			focusConfirm: false
			
		  })
		  
		  if(formValues[0] === "" || formValues[1] === ""){
			  Swal.fire("Por favor llene todos los campos") // revisar
		  }
		  if (formValues) {
			Swal.fire("Datos agregados correctamente")
		  }
	
	};
	
	const addquestion = async () => {
		const { value: pregunta } = await Swal.fire({
			title: 'Crear pregunta',
			input: 'select',
			inputOptions: {
	
				'Abierta': 'Abierta',
	
			  'Cerrada': {
				OpcionMultiple: 'Opcion multiple',
				Trueoffalse: 'True of false',
			  },
			},
			inputPlaceholder: 'Seleccione el tipo de pregunta',
			showCancelButton: true,
			/* inputValidator: (value) => {
			  return new Promise((resolve) => {
				if (value === 'oranges') {
				  resolve()
				} else {
				  resolve('You need to select oranges :)')
				}
			  })
			} */
		  })
		  
		  if (pregunta === 'Abierta' ) {
			Swal.fire({
				title: 'Ingrese la pregunta',
				input: 'text',
				inputValue: '',
				showCancelButton: true,
				inputValidator: (value) => {
				  if (!value) {
					return 'Tienes que escribir una pregunta!'
				  }
				}
			  })
			  
		  }
		  else if(pregunta === 'OpcionMultiple'){
			Swal.fire({
			title: 'Ingrese la pregunta',
			html:
				  '<input id="swal-input1"  placeholder="Pregunta" class="swal2-input">' +
				  '<input id="swal-input2"  placeholder="Opcion A" class="swal2-input">'+
				  '<input id="swal-input3"  placeholder="Opcion B" class="swal2-input">' +
				  '<input id="swal-input4"  placeholder="Opcion C" class="swal2-input">'+
				  '<input id="swal-input5"  placeholder="Opcion D" class="swal2-input">',
			focusConfirm: false,
				
			showCancelButton: true,
			inputValidator: (value) => {
			  if (!value) {
				return 'Tienes que escribir una pregunta!'
			  }
			}})
	
	
		  }else if(pregunta === 'Trueoffalse'){
			Swal.fire({
				title: 'Ingrese la pregunta',
				input: 'text',
				inputLabel: 'Las opciones seran true y false',
				inputValue: '',
				showCancelButton: true,
				inputValidator: (value) => {
				  if (!value) {
					return 'Tienes que escribir una pregunta!'
				  }
				}
			  })
	}
	}
	
	const crearPrueba = async () => {
		const { value: formValues } = await Swal.fire({
			title: 'Crear Prueba',
			html:
			  '<input id="swal-input1"  placeholder="Nombre prueba" class="swal2-input">' +
			  '<input id="swal-input2"  placeholder="Codigo " class="swal2-input">',
			focusConfirm: false
			
		  })
		  
		  if(formValues[0] === "" || formValues[1] === ""){
			  Swal.fire("Por favor llene todos los campos") // revisar
		  }
		  if (formValues) {
			Swal.fire("Datos agregados correctamente")
		  }	
	}
	
	const crearListaOpcion = async (datos) => {
		const { value: formValuess } = await Swal.fire({
			title: 'Crear lista de opciones ',
			html:
			  '<input id="swal-input1"  placeholder="Nombre de lista opciones" class="swal2-input">'+
			  '<input id="swal-input2"  placeholder="Cantidad de Opciones" class="swal2-input">',
			focusConfirm: false
			
		  })
		  
		  if (formValuess) {
			Swal.fire("Datos agregados correctamente")
			console.log({formValuess})
	
			const rectifica = {
				prueba: formValuess[0] ? formValuess[0] : rectifica.name_u, 
				numeroOpciones: formValuess[1] ? formValuess[1] : rectifica.password
			  }
		  }	
	}
	return (
		<Container component="main" maxWidth="s">
		<StyledBody>
		<Helmet><title>{TITLE}</title> </Helmet>
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} style={{ background: '#FFFFFF' }}>
				<Toolbar >
					<IconButton
						className={classes.icon}
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: '36px',
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon style={{ color: '#606060'}}/>
					</IconButton>
					<Typography variant="h5" noWrap component="div" className={classes.typography}>
						Personal
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader >
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: '#000000'}}/>}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List className={classes.icon}>
					<ListItemButton onClick={(e) => handleSubmit(e)}>
						<ListItemIcon ><AccountBoxIcon onClick={enrollStudent} className={classes.icon} /></ListItemIcon>
						<ListItemText primary="Inscribir estudiantes" /></ListItemButton>
				<ListItemButton>
					<ListItemIcon>
					<QuestionMarkIcon className={classes.icon} onClick={addquestion} />
					</ListItemIcon>
					<ListItemText primary="Crear preguntas" />
				</ListItemButton>
                <ListItemButton>
					<ListItemIcon>
					<QuizIcon className={classes.icon} onClick={crearPrueba} />
					</ListItemIcon>
					<ListItemText primary="Crear pruebas" />
				</ListItemButton>
                <ListItemButton>
					<ListItemIcon>
					<WidgetsIcon className={classes.icon} onClick={crearListaOpcion} />
					</ListItemIcon>
					<ListItemText primary="Crear lista de opciones" />
				</ListItemButton>
				<ListItemButton >
					<ListItemIcon>
					<LoginIcon className={classes.icon}  />
					</ListItemIcon>
					<ListItemText primary="Cerrar sesion" />
				</ListItemButton >
				</List>
				<Divider />				
			</Drawer>
        <section className="table">
          <AddStaff />
          <ListStaff />
        </section>
		</Box>
		</StyledBody>
		<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
