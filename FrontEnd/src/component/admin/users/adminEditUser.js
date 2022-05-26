import React, { useEffect } from "react";
import { Box, ButtonBase, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { updatePets ,reset, getUserPets } from "../../../store/pets/petSlice";
import { updateUser } from "../../../store/graphqlUser/graphqlUserSlice";

const AdminEditUser = ({setEditPage}) => {
  const { isSuccess, isError, isLoading,selectedUser } = useSelector((state) => state.user);
  const {user}=useSelector((state)=>state.user)
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Please Enter  username"),
    email: Yup.string().required("Please Enter user email"),
    password: Yup.string().required("Please Enter user password"),

  });

  const formik = useFormik({
    initialValues: {
      username: selectedUser.username,
      email: selectedUser.email,
      password: selectedUser.password,

    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateUser({ values, userEmail: selectedUser.email }));
         
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
              <label htmlFor="username" className="form-label">
              username{" "}
              </label>
              <input
                className="form-control"
                placeholder="Enter  userName"
                type="text"
                name="username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
              <div style={{color:"red"}}>{formik.errors.username}</div>
            ) : null}
            </div>
            
          </div>
          {/* mobil input */}
          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
            readOnly={'disapled'}
              className="form-control"
              type="email"
              placeholder="Enter user email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{color:"red"}}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-3 col-sm-12 col-md-12 ">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter user password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{color:"red"}}>{formik.errors.password}</div>
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
export default AdminEditUser;
