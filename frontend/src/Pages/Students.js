
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BallotIcon from '@mui/icons-material/Ballot';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/students.css';
import styledt from 'styled-components';
import image from "../Images/std.png";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'


const drawerWidth = 280;

const TITLE = 'Estudiantes'

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


const useStyles = makeStyles(theme => ({
	root: {
		backgroundSize: 'auto',
		backgroundPosition: 'center',
		height: '100vh',
	},
	typography: {
		color: "#0B1CAD",
		fontFamily: 'Open Sans Condensed',
	},
	icon: {
		color: "#0B1CAD",
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
	// necessary for content to be below app bar
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


export default function Students() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	//const [body, setBody] = useState({ username: Login.username, password: Login.password })
	//console.log("handleChange "+ Login.username);
	const classes = useStyles()

	const handleSubmit = async (e) => {


	};


	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const proof = () => {
		Swal.fire({
			title: 'Codigo del curso',
			input: 'text',
			inputAttributes: {
			  autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Aceptar',
			showLoaderOnConfirm: true,
			preConfirm: (login) => {
			  return fetch(`//api.github.com/users/${login}`)
				.then(response => {
				  if (!response.ok) {
					throw new Error(response.statusText)
				  }
				  return response.json()
				  
				})
				.catch(error => {
				  Swal.showValidationMessage(
					`Request failed: ${error}`
				  )
				})
			},
			allowOutsideClick: () => !Swal.isLoading()
		  }).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Escoge un tipo de pregunta',
					showDenyButton: true,
					showConfirmButton: true,
					confirmButtonColor: '#3141E3 ',
					denyButtonColor: '#6BE85A',
					denyButtonText: `Multiple o F/V`,
					confirmButtonText: 'Abierta'
				  }).then(response => {
					if(response.isDismissed === true){
						proof();
					}else{
						console.log("false ",response, "result ", result);
						//choosenOp();
					}
				  })
				   
			}else{
				console.log("true ");
				proof();
			}
		  })

	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<StyledBody>
			<Helmet><title>{TITLE}</title> </Helmet>
			<Box sx={{ display: 'flex' }} >
				<CssBaseline />
				<AppBar position="fixed" open={open} >
					<Toolbar style={{ background: '#FFFFFF' }}>
						<IconButton
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon style={{ color: '#0B1CAD' }} />
						</IconButton>
						<Typography variant="h5" noWrap component="div" className={classes.typography}>
							Estudiantes
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open} >
					<DrawerHeader >
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#0B1CAD' }} /> : <ChevronLeftIcon style={{ color: '#0B1CAD' }} />}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List className={classes.icon} >
						<ListItemButton onClick={(e) => handleSubmit(e)}>
							<ListItemIcon ><AccountCircleIcon className={classes.icon} /></ListItemIcon>
							<ListItemText primary="Administrar perfil" /></ListItemButton>
						<ListItemButton>
							<ListItemIcon >
								<BallotIcon className={classes.icon} />
							</ListItemIcon>
							<ListItemText primary="Informes de asistencia" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon >
								<QuestionMarkIcon 
								onClick={proof}
								className={classes.icon} />
							</ListItemIcon>
							<ListItemText 
							onClick={proof}
							primary="Marcar asistencia" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<LoginIcon className={classes.icon} />
							</ListItemIcon>
							<ListItemText primary="Cerrar sesión" />
						</ListItemButton>
					</List>
					<Divider />
				</Drawer>
			</Box>
		</StyledBody>
	);
}
