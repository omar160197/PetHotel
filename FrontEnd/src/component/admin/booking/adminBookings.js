import { Button, ButtonBase, Container } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookings, getUserBook, selectBook } from "../../../store/bookings/bookingSlice";
import { useNavigate } from "react-router-dom";
import { getOnePet } from "../../../store/pets/petSlice";
import AdminEditBooking from "./adminEditBooking";
// import AddPageBooking from "./createBooking";

const AdminBooking = ({ userId }) => {
  const { bookings, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.bookings
  );
  const { pet } = useSelector((state) => state.pets);
  const [editPage, setEditPage] = React.useState(false);
  const [addPage, setAddPage] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userId) {
      dispatch(getUserBook(userId));
    }
  }, [navigate]);

  return (
    <Box sx={{ backgroundColor: "white", padding: "2%" }}>
      <h3 style={{ fontWeight: "bold", fontFamily: "tahoma" }}>Booking</h3>
      {(!addPage && !editPage) &&
      <>
      {/* <Box>
        <ButtonBase
         onClick={()=>setAddPage(true)}
          sx={{
            width: "7%",
            height: "50px",
            backgroundColor: "#f62d37",
            color: "white",
            fontSize: "20px",
            marginTop: "3%",
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

      <TableContainer component={Paper} sx={{ marginTop: "2%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#F0F2F5" }}>
            <TableRow>
            <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                OwnerId
              </TableCell>
              <TableCell sx={{ fontSize: "20px", textAlign: "center" }}>
                Pet
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              >
                Arraival
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              >
                Departure
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              >
                Total Fee
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              >
                Notes
              </TableCell>
              <TableCell
                sx={{ fontSize: "20px", textAlign: "center" }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {row.ownerId}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {row.petName}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  align="right"
                >
                  {row.from.split('T')[0]}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  align="right"
                >
                  {row.to.split('T')[0]}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  align="right"
                >
                  <span
                    style={{
                      backgroundColor: `${
                        row.status === "Booked"
                          ? "#10ea26"
                          : row.status === "Inprogress"
                          ? "#ffc107"
                          : row.status === "Completed"
                          ? "#d50000"
                          : ""
                      }`,
                      padding: "4%",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  align="right"
                >
                  {row.fee}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", textAlign: "center" }}
                  align="right"
                >
                  {row.note}
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }} align="right">
                  <Button 
                  onClick={()=>{
                    setEditPage(true);
                   dispatch(selectBook(row))
                   dispatch(getOnePet(row.petId))
                  }}
                  sx={{ fontSize: "16px" }} variant="text">
                    Edit
                  </Button>
                  <Button
                  onClick={()=>dispatch(deleteBookings({bookId:row._id,ownerId:userId}))}
                    sx={{ color: "red", fontSize: "16px" }}
                    variant="text"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>}

       {editPage && <AdminEditBooking setEditPage={setEditPage}/>}
       {/* {addPage && <AddPageBooking setAddPage={setAddPage}/>} */}
       
    </Box>
  );
};
export default AdminBooking;
