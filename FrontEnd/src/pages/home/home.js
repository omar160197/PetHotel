import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';
import { Navigate, useNavigate } from 'react-router-dom';
import Booking from '../../component/booking/booking'
import Pets from '../../component/pets/pets';
import Profile from '../../component/profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/graphqlUser/graphqlUserSlice';
import { getUserPets } from '../../store/pets/petSlice';
import AdminPets from '../../component/admin/pets/adminBets';
import AdminBooking from '../../component/admin/booking/adminBookings';
import AdminUsers from '../../component/admin/users/adminUsers';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const {isLoading,user,message,isError,isSuccess} = useSelector((state)=>state.user)
  const dispatch=useDispatch()

  React.useEffect(()=>{

if (user === null){
  dispatch(reset())
  navigate('/login') 
}
});


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentPage,setCurrentPage]=React.useState('pets')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor:"white"}} open={open}>
        <Toolbar sx={{justifyContent:"space-between"}}>
            <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{color:"black",fontSize:"30px"}}/>
          </IconButton>
          
          </div>
          <div> <Profile username={user && user.username}/></div>
         
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            <h2 style={{marginRight:"20%" ,marginTop:"10%"}}>Pet Hotel</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
   
        { user && user.email !== "admin@gmail.com" && <List>
         
            <ListItem sx={{paddingY:"2%",backgroundColor:`${currentPage === "pets"?"#FFF1F0":""}`,borderRight:`${currentPage === "pets"?"solid 3px #f62d37":""}`}} disablePadding onClick={()=>{
              setCurrentPage('pets')
              
              }}>
              <ListItemButton>
                <ListItemIcon>
                  { <GitHubIcon 
                  sx={{color:`${currentPage === "pets"?"#f62d37":""}`}}
                  />}
                </ListItemIcon>
                <ListItemText sx={{color:`${currentPage === "pets"?"#f62d37":""}`}} primary={"Pets"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{paddingY:"2%",backgroundColor:`${currentPage === "booking"?"#FFF1F0":""}`,borderRight:`${currentPage === "booking"?"solid 3px #f62d37":""}`}} onClick={()=>setCurrentPage('booking')}>
              <ListItemButton>
                <ListItemIcon>
                  { <BookIcon sx={{color:`${currentPage === "booking"?"#f62d37":""}`}}/>}
                </ListItemIcon>
                <ListItemText sx={{color:`${currentPage === "booking"?"#f62d37":""}`}} primary={"Booking"} />
              </ListItemButton>
            </ListItem>
          
        </List>}


        { user && user.email === "admin@gmail.com" && 
        <List> 
            <ListItem sx={{paddingY:"2%",backgroundColor:`${currentPage === "pets"?"#FFF1F0":""}`,borderRight:`${currentPage === "pets"?"solid 3px #f62d37":""}`}} disablePadding onClick={()=>{
              setCurrentPage('pets')
              
              }}>
              <ListItemButton>
                <ListItemIcon>
                  { <GitHubIcon 
                  sx={{color:`${currentPage === "pets"?"#f62d37":""}`}}
                  />}
                </ListItemIcon>
                <ListItemText sx={{color:`${currentPage === "pets"?"#f62d37":""}`}} primary={"Pets"} />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{paddingY:"2%",backgroundColor:`${currentPage === "users"?"#FFF1F0":""}`,borderRight:`${currentPage === "users"?"solid 3px #f62d37":""}`}} disablePadding onClick={()=>{
              setCurrentPage('users')
              
              }}>
              <ListItemButton>
                <ListItemIcon>
                  { <PeopleAltIcon  
                  sx={{color:`${currentPage === "users"?"#f62d37":""}`}}
                  />}
                </ListItemIcon>
                <ListItemText sx={{color:`${currentPage === "users"?"#f62d37":""}`}} primary={"users"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{paddingY:"2%",backgroundColor:`${currentPage === "booking"?"#FFF1F0":""}`,borderRight:`${currentPage === "booking"?"solid 3px #f62d37":""}`}} onClick={()=>setCurrentPage('booking')}>
              <ListItemButton>
                <ListItemIcon>
                  { <BookIcon sx={{color:`${currentPage === "booking"?"#f62d37":""}`}}/>}
                </ListItemIcon>
                <ListItemText sx={{color:`${currentPage === "booking"?"#f62d37":""}`}} primary={"Booking"} />
              </ListItemButton>
            </ListItem>
          
        </List>}
 
      </Drawer>

      {user && user.username !== 'Admin' && <Main open={open}>
        <DrawerHeader />
        
        {currentPage === 'booking' && <Booking userId={user && user._id}/>}
        {currentPage === 'pets' &&<Pets userId={user && user._id}/>}
        {currentPage === 'users' &&<AdminPets></AdminPets>}
      </Main>}

      {user && user.username === 'Admin' && <Main open={open}>
        <DrawerHeader />
        
        {currentPage === 'booking' && <AdminBooking userId={user && user._id}/>}
        {currentPage === 'pets' &&<AdminPets userId={user && user._id}/>}
        {currentPage === 'users' &&<AdminUsers/>}
      </Main>}
    </Box>
  );
}
