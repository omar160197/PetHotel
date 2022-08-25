import { Button, ButtonBase, Container } from "@mui/material";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import { deletePets, getUserPets, selectPet } from "../../../store/pets/petSlice";
import { useNavigate } from "react-router-dom";

import { deleteUser, getAllUsers, selectUser } from "../../../store/graphqlUser/graphqlUserSlice";
import AdminEditUser from "./adminEditUser";


const AdminUsers = () => {
const [editPage,setEditPage]=React.useState(false)
const [addPage,setAddPage]=React.useState(false)

  const {allUsers,user,isSuccess,isError,isLoading,message}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  React.useEffect(()=>{
    if(user){
      dispatch(getAllUsers(user.email))
    }
      
  },[navigate])
    const rows =[{

    }]
  return (
    <Box sx={{ backgroundColor: "white", padding: "2%" }}>
      <h3 style={{marginBottom: "3%", fontWeight: "bold", fontFamily: "tahoma"  }}>Pets</h3>
      {(!addPage && !editPage) &&
        <>

    <TableContainer component={Paper} sx={{marginTop:"2%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#F0F2F5"}}>
          <TableRow>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}}>UserId</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}}>Name</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right">email</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody >
          {allUsers.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} component="th" scope="row">
              {row._id}
              </TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} component="th" scope="row">
              {row.username}
              </TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} align="right">{row.email}</TableCell>            
              <TableCell sx={{fontSize:"16px"}} align="right">
              <Button  sx={{fontSize:"16px"}} variant="text" onClick={()=>{
                setEditPage(true);
               dispatch(selectUser(row))
              }}>Edit</Button> 
              <Button
              onClick={()=>dispatch(deleteUser({userEmail : row.email}))}
              sx={{color:"red",fontSize:"16px"}} variant="text">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    }

    {editPage && <AdminEditUser setEditPage={setEditPage}/>}

    </Box>
  );
};
export default AdminUsers;
