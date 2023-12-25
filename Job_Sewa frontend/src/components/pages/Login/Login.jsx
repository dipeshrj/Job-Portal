import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { $axios } from '../../lib/axios';
// import "./Login.css";
import { styled } from 'styled-components';
import CustomSnackbar from '../../CustomSnackbar';
import Loader from '../../Loader';


const Login = () => {

  const [loading, setLoading] = useState(false)
const [errorInfo, setErrorInfo] = useState({
    isError: false,
    errorMessage: ""
  })
  const navigate = useNavigate()
  

  return (
    <StyledDivContainer>
      {loading && <Loader/>}
      <CustomSnackbar
          open={errorInfo.isError}
          status="error"
        message={errorInfo.errorMessage}
        />
      <Formik
       initialValues={{ email: '',password: ''}}
       validationSchema={Yup.object({
         email: Yup.string().email('Invalid email address')
           .required('Email is required').trim(),
         password: Yup.string()
           .required('Required')
         .trim(),
         
       })}
       onSubmit={async (values, ) => {
        console.log(values)
         try {
           setLoading(true)
          //  hit route
           const response = await $axios.post("/user/login", values)
           
          //  extract access Token
           const accesstoken = response.data.access_token

          //  save accesstoken to local storage
           localStorage.setItem('accesstoken', accesstoken)

           //  extract role
           const role = response.data.user.role
           //  save role of person
           localStorage.setItem('role', role)
           
          // navigate to home page
           navigate("/home")
          setLoading(false)           
         } catch (error) {
           setErrorInfo({
              isError: true,
              errorMessage: error.response.data.message
            })
          // console.log(error.response.data.message)
         } finally {
           setLoading(false)
        }
       }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
        
          <Form className='form'>
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
      <Typography variant="h4" sx={{display:"block", margin:"auto",textAlign:"center"}}>Login Page</Typography>

            
            <TextField name="email" label="Email" {...getFieldProps("email")} />
            {touched.email && errors.email ? (
              <div className="error-message">{errors.email}</div>
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
 
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
            >Login</Button>
              <Link style={{color:"black"}} to="/register">Don&apos;t have an account?</Link>
          </Form>
        )}
     </Formik>
    </StyledDivContainer>
  )
}

export default Login


const StyledDivContainer = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100vw;
`