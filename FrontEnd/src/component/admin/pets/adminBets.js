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
import AdminEditPage from "./adminEditBets";


const AdminPets = ({userId}) => {
const [editPage,setEditPage]=React.useState(false)
const [addPage,setAddPage]=React.useState(false)

  const {pets,isSuccess,isError,isLoading,message}=useSelector((state)=>state.pets)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  React.useEffect(()=>{
    if(userId){
      dispatch(getUserPets(userId))
    }
      
  },[navigate])
    const rows =[{

    }]
  return (
    <Box sx={{ backgroundColor: "white", padding: "2%" }}>
      <h3 style={{marginBottom: "3%", fontWeight: "bold", fontFamily: "tahoma"  }}>Pets</h3>
      {(!addPage && !editPage) &&
        <>
      {/* <Box>
        <ButtonBase
        onClick={()=>setAddPage(true)}
          type="submit"
          sx={{
            width: "7%",
            height: "50px",
            backgroundColor: "#f62d37",
            color: "white",
            fontSize: "20px",
            borderRadius: "10px",
          }}
        >
          <i
          
            style={{ marginRight: "2%", color: "white" }}
            className="fa-solid fa-plus"
          ></i>
          New
        </ButtonBase>
      </Box> */}

    <TableContainer component={Paper} sx={{marginTop:"2%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#F0F2F5"}}>
          <TableRow>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}}>OwnerId</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}}>Name</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right">Type</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right">Breed</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right">Size</TableCell>
            <TableCell sx={{fontSize:"20px",textAlign:"center"}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {pets.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} component="th" scope="row">
              {row.ownerId}
              </TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} component="th" scope="row">
              {row.name}
              </TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} align="right">{row.type}</TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} align="right">{row.breed}</TableCell>
              <TableCell sx={{fontSize:"16px",textAlign:"center"}} align="right">{row.size}</TableCell>
              <TableCell sx={{fontSize:"16px"}} align="right">
              <Button  sx={{fontSize:"16px"}} variant="text" onClick={()=>{
                setEditPage(true);
               dispatch(selectPet(row))
              }}>Edit</Button> 
              <Button
              onClick={()=>dispatch(deletePets({petId:row._id,ownerId:userId}))}
              sx={{color:"red",fontSize:"16px"}} variant="text">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    }

    {editPage && <AdminEditPage setEditPage={setEditPage}/>}

    </Box>
  );
};
export default AdminPets;
