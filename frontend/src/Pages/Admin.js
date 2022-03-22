
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import "../Styles/admin.css";
import AddAdmin from "../Components/AddAdmin.js";
import ListAdmin from "../Components/ListAdmins.js";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
import {logout} from "./Logout";
const TITLE = 'Administrador'

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
	icons: {
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

const home = () =>{
	window.location = "/admin";
  }

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

export default function Admin() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const classes = useStyles()

	const course = () =>{
        window.location = "/courses";
    };

	const staff = () =>{
        window.location = "/staff";
    };

	const students = () =>{
        window.location = "/students";
    };

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Container component="main" maxWidth="s">
		<StyledBody>
		<Helmet><title>{TITLE}</title> </Helmet>
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} style={{ background: '#FFFFFF' }}>
				<Toolbar >
					<IconButton
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: '36px',
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon className={classes.icons}/>
					</IconButton>
					<Typography variant="h5" noWrap component="div" className={classes.typography}>
						Administrador
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader >
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#000000' }} /> : <ChevronLeftIcon style={{ color: '#000000'}} />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItemButton onClick={() => course()}>
						<ListItemIcon ><ListAltIcon className={classes.icons} /></ListItemIcon>
						<ListItemText primary="Crear curso" /></ListItemButton>
				<ListItemButton>
					<ListItemIcon>
					<PersonAddIcon onClick={() => staff()} className={classes.icons}/>
					</ListItemIcon>
					<ListItemText onClick={() => staff()} primary="Agregar y ver personal" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
					<AccessibilityNewIcon onClick={() => students()} className={classes.icons}/>
					</ListItemIcon>
					<ListItemText onClick={() => students()} primary="Agregar y ver estudiantes" />
				</ListItemButton>
				<ListItemButton>
					<ListItemIcon>
					<LoginIcon onClick={() => logout()} className={classes.icons}/>
					</ListItemIcon>
					<ListItemText onClick={() => logout()} primary="Cerrar sesión" />
				</ListItemButton>
				</List>
				<Divider />		
			</Drawer>
        <section className="table">
          <AddAdmin />
          <ListAdmin />
        </section>
		</Box>
		</StyledBody>
		<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
