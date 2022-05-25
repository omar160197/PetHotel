import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dog from "../../assets/dog.jpg";
import dogSignUp from "../../assets/dogSignUp.jpg";
import styles from "./login.module.css";
import { Button, ButtonBase, Divider, TextField } from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginUser, reset } from "../../store/graphqlUser/graphqlUserSlice";
import SignUp from "../signUp/signUp";
import { getUserPets } from "../../store/pets/petSlice";

export default function Login() {
  const [loginStatus, setLoginStatus] = React.useState(false);
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginUser(userData));
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              backgroundColor: "#fff",
              top: 0,
              bottom: 0,
              position: "absolute",
              width: "79%",
            }}
          >
            <img src={loginStatus ? dogSignUp : dog} className={styles.image} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
              backgroundColor: "#fff",
              top: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              width: "30%",
            }}
          >
            <h1 style={{ position: "absolute", top: 0, marginTop: "13%" }}>
              Pet Hotel
            </h1>
            {!loginStatus &&
            <>
            <form
              style={{ width: "80%", marginTop: "37%" }}
              onSubmit={formik.handleSubmit}
            >
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
                  Sign In
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
                    userName or password is inCorrect
                  </span>
                </div>
              )}
            </form>

            <Divider sx={{ width: "100%", marginTop: "10%" }}> Or </Divider>
            <div style={{ marginTop: "10%" }}>
              <i
                style={{
                  fontSize: "50px",
                  color: "#1769aa",
                  cursor: "pointer",
                }}
                className="fa-brands fa-facebook"
              ></i>
              <i
                style={{
                  fontSize: "50px",
                  marginLeft: "25px",
                  color: "#f62d37",
                  cursor: "pointer",
                }}
                className="fa-brands fa-google"
              ></i>
              <i
                style={{
                  fontSize: "50px",
                  marginLeft: "25px",
                  color: "#2196f3",
                  cursor: "pointer",
                }}
                className="fa-brands fa-twitter"
              ></i>
             </div>
             <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5 style={{ marginTop: "30%", marginLeft: "0" }}>
                <Button
                  onClick={() => setLoginStatus(true)}
                  style={{ color: "#f62d37", fontSize: "17px" }}
                >
                  Create an account
                </Button>
              </h5>
            </div>
            </>
            }

            {loginStatus && <SignUp 
            setLoginStatus={setLoginStatus}
            loginStatus={loginStatus}/>}     
           
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
