import { Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup"
// import "./AddJob.css"
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { $axios } from '../../lib/axios';
import Loader from '../../Loader';

const AddJob = () => {
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
  return (
    <div className='divContainer'
      style={{
      marginTop:"1rem"
      }}>
      {loading && <Loader/>}
      
        
          
    <Formik
        initialValues={{
          name: '',
          company: '',
          description:' ',
          salary: 0,
          quantity: 0,
          category: '',
          validDate:''
        }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(55, "Must be at most 55 characters.")
            .required("Name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
        company: Yup.string()
          .max(55, "Must be at most 55 characters.")
            .required("Company name is required.")
            .min(2, "Must be at least 2 characters.")
          .trim(),
        description: Yup.string()
          .max(300, "Must be at most 300 characters.")
          .required("Description of job is required.")
        .min(20, "Must be at least 20 characters.")
          .trim(),
        salary: Yup.number().required('Price is required')
          .min(0,"Price cannot be 0."),
        quantity: Yup.number().min(1,"Quantity must be at least 1.").integer(),
        category: Yup.mixed().oneOf([
          "teaching",
            "medical",
            "IT",
            "finance",
            "sales",
            "marketing",
            "transport",
            "hotel",
            "services",
            "workshop",
        ]).required(),
        validDate: Yup.date("Must be valid date.").required(
            "Job validity date is required.")
      })}
      onSubmit={async(values) => {
        console.log(values)
        
         // api hit
        try {
          setLoading(true)
          const response = await $axios.post("/job/add", values)
          setLoading(false)          
            // navigate to jobs page
          navigate("/jobs")
        } catch (error) {
          setLoading(false)
            console.log(error.message.data)
          }
      }}
    >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          
          <form className='form' onSubmit={handleSubmit}>
                  <Typography variant="h5" sx={{display:"block", margin:"auto",textAlign:"center"}}>Add Job</Typography>       
            <TextField
              name="name"
              label="Job Name"
              {...getFieldProps("name")}
            />
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}

            <TextField
              name="company"
              label="Company"
              {...getFieldProps("company")}
            />
            {touched.company && errors.company ? (
              <div className="error-message">{errors.company}</div>
            ) : null}

             <TextField
              name="description"
              label="Description"
              {...getFieldProps("description")}
            />
            {touched.description && errors.description ? (
              <div className="error-message">{errors.description}</div>
            ) : null}

            <TextField
              name="salary"
              label="Salary"
              {...getFieldProps("salary")}
              type="number"
            />
            {touched.salary && errors.salary ? (
              <div className="error-message">{errors.salary}</div>
            ) : null}

            <FormControl>
           <InputLabel id="demo-simple-select-label">Category</InputLabel>
           <Select
             name="category"
                label="Category"
                {...getFieldProps("category")}
              >
               
              <MenuItem value={"teaching"}>Backend</MenuItem>
                <MenuItem value={"medical"}>Medical</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"finance"}>Finance</MenuItem>
                <MenuItem value={"sales"}>Sales</MenuItem>
                <MenuItem value={"marketing"}>Marketing</MenuItem>
                <MenuItem value={"transport"}>Transport</MenuItem>
                <MenuItem value={"hotel"}>Hotel</MenuItem>
                <MenuItem value={"services"}>Services</MenuItem>
                <MenuItem value={"maintenance"}>Maintenance</MenuItem>

              </Select>
              {touched.category && errors.category ? (
              <div className="error-message">{errors.category}</div>
            ) : null}
          </FormControl>
            
            <TextField
              name="quantity"
              label="Quantity"
              {...getFieldProps("quantity")}
              type="number"
            />
            {touched.quantity && errors.quantity ? (
              <div className="error-message">{errors.quantity}</div>
            ) : null}

                      
             <TextField name="validDate" label="Valid Date" {...getFieldProps("validDate")} />
            {touched.validDate && errors.validDate ? (
              <div className="error-message">{errors.validDate}</div>
            ) : null}

           <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "1rem" }}
            >
              Add Job
              </Button>
        </form>
      )}
    </Formik>
    </div>
  )
}

export default AddJob