import React, { useEffect, useState } from "react";
import { Box, ButtonBase, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./editePage.css";
import { useNavigate } from "react-router-dom";
import { updatePets ,reset, getUserPets, getOnePet } from "../../../store/pets/petSlice";
import { updateAdminBookings } from "../../../store/bookings/bookingSlice";

const AdminEditBooking = ({setEditPage}) => {
  const { isSuccess, isError, isLoading,pets,pet } = useSelector((state) => state.pets);
  const {selectBook}=useSelector((state)=>state.bookings)
  const {user}=useSelector((state)=>state.user)

  const [selectValue,setSelectValue]=useState(selectBook._id)
  
  const handelChange=(e)=>{
      console.log(e);
  }
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    petName: Yup.string().required("Please Enter your pet name"),
    from: Yup.string().required("Please Enter your pet from"),
    to: Yup.string().required("Please Enter your pet to"),
    note: Yup.string().required("Please Enter your pet note"),
  });

  const formik = useFormik({
    initialValues: {
      petName: selectBook.petName,
      from: selectBook.from,
      to: selectBook.to,
      note: selectBook.note,
      fee:selectBook.fee,
      petId:selectBook.petId,
      status:selectBook.status,
      ownerId:selectBook.ownerId
    },
    onSubmit: (values) => {
      // console.log("hi");
      // dispatch(getOnePet(values.petId))
    
       
       console.log(values); 
      dispatch(updateAdminBookings({ values, bookId: selectBook._id,ownerId:user._id }));
         
      if (isError) {
        console.log("error mesage");
      }
      setEditPage(false)
    },
    validationSchema,
  });
  return (
    <Container
    
    >
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {/* ------------nameinput-------------- */}
          <div className=" d-flex form-recipts justify-content-between">
            <div className="mb-3 col-sm-12 col-md-12">
              <label htmlFor="petName" className="form-label">
                PetName{" "}
              </label>
             <input
              className="form-control"
              type="text"
              readOnly="readonly"
              placeholder="Enter Your Book Start Time"
              name="petName"
              {...formik.getFieldProps("petName")}
            />
              {formik.touched.petName && formik.errors.petName ? (
              <div style={{color:"red"}}>{formik.errors.petName}</div>
            ) : null}
            </div>
            
          </div>

          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
             
            style={{width:"15%",marginLeft:"3%",height:"30px"}}
            name="status"
            {...formik.getFieldProps("status")}
            >
                 <option value={'Booked'}>Booked</option>
                 <option value={'Inprogress'}>Inprogress</option>
                 <option value={'Completed'}>Completed</option>
             
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div style={{color:"red"}}>{formik.errors.status}</div>
            ) : null}
          </div>
          {/* mobil input */}
          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="from" className="form-label">
              From
            </label>
            <input
              className="form-control"
              type="date"
              
              placeholder="Enter Your Book Start Time"
              name="from"
              {...formik.getFieldProps("from")}
            />
            {formik.touched.from && formik.errors.from ? (
              <div style={{color:"red"}}>{formik.errors.from}</div>
            ) : null}
          </div>

          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="to" className="form-label">
              To
            </label>
            <input
              className="form-control"
              type="date"
              placeholder="Enter Your Book End Time"
              name="to"
              {...formik.getFieldProps("to")}
            />
            {formik.touched.to && formik.errors.to ? (
              <div style={{color:"red"}}>{formik.errors.to}</div>
            ) : null}
          </div>

          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="note" className="form-label">
              Note
            </label>
            <input
              className="form-control"
              type="text"
              readOnly="readonly"
              placeholder="Enter Your Book note"
              name="note"
              {...formik.getFieldProps("note")}
            />
            {formik.touched.note && formik.errors.note ? (
              <div style={{color:"red"}}>{formik.errors.note}</div>
            ) : null}
          </div>

          

          <ButtonBase
                  type="submit"
                  sx={{
                    width: "16%",
                    height: "50px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    fontSize: "22px",
                    marginTop: "7%",
                    marginLeft:"auto",
                    marginRight:"auto",
                    borderRadius:"10px"
                  }}
                >
                    <i style={{marginRight:"10%"}} className="fa-solid fa-floppy-disk"></i>
                  Save
                </ButtonBase>
                <ButtonBase
                 onClick={()=> setEditPage(false)}
                  sx={{
                    width: "10%",
                    height: "50px",
                    backgroundColor: "#f62d37",
                    color: "white",
                    fontSize: "22px",
                    marginTop: "7%",
                    marginLeft:"5%",
                    borderRadius:"10px"
                  }}
                >
                  back
                </ButtonBase>
        </form>
      </Box>
    </Container>
  );
};
export default AdminEditBooking;
