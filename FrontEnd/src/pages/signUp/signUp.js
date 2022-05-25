import { ButtonBase,Button } from "@mui/material"
import * as React from "react";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerUser, reset } from "../../store/graphqlUser/graphqlUserSlice";
import styles from "./signUp.module.css";


const SignUp=({loginStatus,setLoginStatus})=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please Enter your Email")
      .email("Invalid email format"),
    password: Yup.string().required("Please Enter your Password"),
    name:Yup.string().required("please Enter Your FullName")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name:""
    },

    onSubmit: (values) => {
      console.log(values);
      const userData = {
        email: values.email,
        password: values.password,
        name:values.name
      };
      dispatch(registerUser(userData));
      if (isError) {
        console.log("error mesage");
      }
      if (isSuccess || user) {
        navigate("/home");
      }
      dispatch(reset());
    },
    validationSchema,
  });

  useEffect(() => {
    if (isSuccess || user) {
      // dispatch(reset())
      navigate("/home");
    }
  }, [user, isSuccess, isError, message, navigate, dispatch]);

return(

    <>
        <form
              style={{ width: "80%", marginTop: "37%" }}
              onSubmit={formik.handleSubmit}
            ><div style={{ width: "100%", marginTop: "3%" }}>
            <input
              type="text"
              name="name"
              placeholder="  Enter Your FullName"
              className={styles.email}
              style={{ width: "100%", height: "50px" }}
              {...formik.getFieldProps("name")}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
                <div
                  style={{ color: "red", marginLeft: "20px" }}
                  className="error"
                >
                  {formik.errors.name}
                </div>
              ) : null}

              <div style={{ width: "100%", marginTop: "3%" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="  Enter Your Email"
                  className={styles.email}
                  style={{ width: "100%", height: "50px" }}
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  style={{ color: "red", marginLeft: "20px" }}
                  className="error"
                >
                  {formik.errors.email}
                </div>
              ) : null}
              <div style={{ width: "100%", marginTop: "3%" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="  Enter Your Psaaword"
                  className={styles.email}
                  style={{ width: "100%", height: "50px" }}
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div
                  style={{ color: "red", marginLeft: "20px" }}
                  className="error"
                >
                  {formik.errors.password}
                </div>
              ) : null}

              <div>
                <ButtonBase
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#f62d37",
                    color: "white",
                    fontSize: "22px",
                    marginTop: "7%",
                  }}
                >
                  Sign Up
                </ButtonBase>
              </div>
              {isError && (
                <div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    this Email is already exists
                  </span>
                </div>
              )}
            </form>
             <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5 style={{ marginTop: "30%", marginLeft: "0" }}>
                  <Button
                    onClick={() => setLoginStatus(false)}
                    style={{ color: "#f62d37", fontSize: "17px" }}
                  >
                    Already have an account? Sign in.
                  </Button>
                </h5>
              </div> 
   
    </>
)

}
export default SignUp