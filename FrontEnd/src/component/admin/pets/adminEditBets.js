import React, { useEffect } from "react";
import { Box, ButtonBase, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { updatePets ,reset, getUserPets, updateAdminPets } from "../../../store/pets/petSlice";

const AdminEditPage = ({setEditPage}) => {
  const { isSuccess, isError, isLoading,selectPet } = useSelector((state) => state.pets);
  const {user}=useSelector((state)=>state.user)
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your pet name"),
    breed: Yup.string().required("Please Enter your pet breed"),
    size: Yup.string().required("Please Enter your pet size"),
    type: Yup.string().required("Please Enter your pet type"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectPet.name,
      breed: selectPet.breed,
      size: selectPet.size,
      type: selectPet.type,
      
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateAdminPets({ values,ownerId:user._id ,petId: selectPet._id }));
         
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
              <label htmlFor="name" className="form-label">
                PetName{" "}
              </label>
              <input
                className="form-control"
                placeholder="Enter Your petName"
                type="text"
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
              <div style={{color:"red"}}>{formik.errors.name}</div>
            ) : null}
            </div>
            
          </div>
          {/* mobil input */}
          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="breed" className="form-label">
              breed
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Your Pet breed"
              name="breed"
              {...formik.getFieldProps("breed")}
            />
            {formik.touched.breed && formik.errors.breed ? (
              <div style={{color:"red"}}>{formik.errors.breed}</div>
            ) : null}
          </div>

          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="type" className="form-label">
              Pet Type
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Your Pet Type"
              name="type"
              {...formik.getFieldProps("type")}
            />
            {formik.touched.type && formik.errors.type ? (
              <div style={{color:"red"}}>{formik.errors.type}</div>
            ) : null}
          </div>

          <div >
            <label htmlFor="size" className="form-label">
              Size :
            </label>
            <select 
            style={{width:"15%",marginLeft:"3%",height:"30px"}}
            name="size"
            {...formik.getFieldProps("size")}
            >
              <option value="small">small</option>
              <option value="meduim">meduim</option>
              <option value="large">large</option>
             
            </select>
            {formik.touched.size && formik.errors.size ? (
              <div className="errorForm">{formik.errors.size}</div>
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
export default AdminEditPage;
