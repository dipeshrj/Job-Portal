import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Box, Button, CircularProgress, Grid, Pagination, Typography } from '@mui/material'
import { $axios } from '../../lib/axios'
import JobCard from '../../card/JobCard'
import CustomSnackbar from '../../CustomSnackbar'
import Loader from '../../Loader'

const Jobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(1)
  const [isItemDeleted, setIsItemDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorInfo, setErrorInfo] = useState({
    isError: false,
    errorMessage: ""
  })

  // extract role from local storage
  const role = localStorage.getItem('role')


  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = role==="seeker"?await $axios.post("/jobs/seeker/all",
        { page, limit: 5 }):await $axios.post("/jobs/provider/all",
          { page, limit: 5 })
      setLoading(false)
      setJobs(response.data)
    } catch (error) {
      setLoading(false)
      setErrorInfo({
              isError: true,
              errorMessage: error.response.data.message
            })
    }
  }
  const getPaginationData = (event, data) => {
    setPage(data)
  }
  useEffect(() => {
    fetchJobs()
  },[page, isItemDeleted])
  return (
    <>
      {loading && <Loader/>}
      <CustomSnackbar
          open={errorInfo.isError}
          status="error"
        message={errorInfo.errorMessage}
        />
      
      <Box sx={{
        minHeight: "463px",
}}>
        
        {role==="provider"&&
        <Grid container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0.8rem",  
            paddingRight:"2rem"
        }}>
          <Grid item>
              <Button onClick={()=>navigate('/jobs/add') }variant='outlined' >Add Job</Button>
          </Grid>
      </Grid>
        }
      {
          jobs.length === 0 ? <Typography sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            margin:"2rem"
            }}>No jobs found</Typography> : <Box >
        
          <Grid container >
                  <Grid item
                    sx={{
                display: "flex",
              padding:"1rem",
            flexDirection: "column",
            gap: "1rem",
            margin: "auto",
            minHeight: "427px",
            justifyContent: "center",
            alignItems: "center",            
                    }}
                  >
              {
                jobs.map((item) => {
                  return <JobCard
                    key={item._id}
                    {...item}
                    isItemDeleted={isItemDeleted}
                    setIsItemDeleted={setIsItemDeleted}
                  />
                })
              }
            </Grid>
                </Grid>
                
        
      </Box>
      }
      
        {/* </Box> */}
        <Grid container sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Pagination  count={10} variant="outlined" shape="rounded" onChange={getPaginationData}/>
      </Grid>
      </Box>
      </>
  )
}

export default Jobs

  