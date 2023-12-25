import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { $axios } from "../../lib/axios";
import CustomSnackbar from "../../CustomSnackbar";
import Loader from "../../Loader";

const Register = () => {
  const [errorInfo, setErrorInfo] = useState({
    isError: false,
    errorMessage: ""
  })
  const [loading,setLoading] = useState(false)
const navigate = useNavigate()

  return (
    <>
      <div className="divContainer">
      {loading && <Loader/>}

        <CustomSnackbar
          open={errorInfo.isError}
          status="error"
        message={errorInfo.errorMessage}
        />
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          role: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address.")
            .required("Email is required.")
            .min(5, "Must be at least 5 characters.")
            .max(55, "Must be at most 55 characters.")
            .trim(),
          firstName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("First name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          lastName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("Last name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          password: Yup.string()
            .max(25, "Must be at most 25 characters.")
            .required("Password is required.")
              // .matches(
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
              //   "Password must be at least 8 character with  at least 1 capital letter, 1 small letter, 1 number and 1 special character."
              // )
            .trim(),

          gender: Yup.string()
            .required("Please choose one gender.")
            .trim()
            .oneOf(
              ["male", "female", "preferNotToSay"],
              "Gender must be male,female or prefer not to say."
            ),

          role: Yup.string()
            .required("Please choose at least one role.")
            .trim()
            .oneOf(["provider", "seeker"]),

          dob: Yup.date("Must be valid date.").required(
            "Birth date is required."
          ),
        })}
        onSubmit={async(values) => {
          setLoading(true)
          // api hit
          try {
            const response =await $axios.post("/user/register", values)
            console.log(response)
            
            // navigate to login page
            navigate("/login")
          setLoading(false)

          } catch (error) {
            setErrorInfo({
              isError: true,
              errorMessage: error.response.data.message
            })
          setLoading(false)

          }
        }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <Box>
            <form className="form"
            onSubmit={handleSubmit}
            >
              <Box>
              <Grid item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          border: "1px solid black",
          borderRadius: "8px",
          width: "30%",
          margin:"auto"
          }}
        >
          <img
            src='\images\job-sewa-logo2.png'
            height={100}
            width={100}
            style={{ objectFit: "contain" }} />
                </Grid></Box>  
              
      <Typography variant="h4" sx={{display:"block", margin:"auto",textAlign:"center"}}>Sign up</Typography>
              
            <TextField name="email" label="Email" {...getFieldProps("email")} />
            {touched.email && errors.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}

            <TextField
              name="firstName"
              label="First name"
              {...getFieldProps("firstName")}
            />
            {touched.firstName && errors.firstName ? (
              <div className="error-message">{errors.firstName}</div>
            ) : null}

            <TextField
              name="lastName"
              label="Last name"
              {...getFieldProps("lastName")}
            />
            {touched.lastName && errors.lastName ? (
              <div className="error-message">{errors.lastName}</div>
            ) : null}

            <TextField
              name="password"
              label="Password"
              type="password"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password ? (
              <div className="error-message">{errors.password}</div>
                ) : null}
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  gap:"1rem"
               }}>
            <FormControl sx={{width:"220px"}}>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" label="Gender" {...getFieldProps("gender")}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
              </Select>
              {touched.gender && errors.gender ? (
                <div className="error-message">{errors.gender}</div>
              ) : null}
                </FormControl>
                
            <FormControl sx={{width:"224px"}}>
              <InputLabel>Role</InputLabel>
              <Select name="role" label="Role" {...getFieldProps("role")}>
                <MenuItem value="provider">Provider</MenuItem>
                <MenuItem value="seeker">Seeker</MenuItem>
              </Select>
              {touched.role && errors.role ? (
                <div className="error-message">{errors.role}</div>
              ) : null}
                  </FormControl>
                  </div> 

            <TextField name="dob" label="DOB" {...getFieldProps("dob")} />
            {touched.dob && errors.dob ? (
              <div className="error-message">{errors.dob}</div>
            ) : null}

            <Button
              variant="contained"
              type="submit"
                  sx={{ marginTop: "1rem" }}
                  disabled={loading}
            >
              Register
              </Button>
                <Link style={{color:"Green"}} to="/login">Already have an account?</Link>
              </form>
              </Box>
        )}
        </Formik>
        </div>
    </>
  );
};

export default Register;

