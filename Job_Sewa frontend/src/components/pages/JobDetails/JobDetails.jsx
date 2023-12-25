import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { $axios } from '../../lib/axios'
import Loader from '../../Loader'

const JobDetails = () => {
    const [jobDetails, setJobDetails] = useState({})
    const [ loading ,setLoading] = useState(false)
    const params = useParams()
    
    const jobId = params.id

    const getJobDetails = async() => {
        try {
            setLoading(true)
            const response = await $axios.get(`job/details/${jobId}`)
            setLoading(false)
            setJobDetails(response.data)
            console.log(response)
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }
    useEffect(() => {
        getJobDetails()
    },[])

  return (
      <><Box sx={{
          height: "74vh",
          display: "flex",
         justifyContent:"center"
      }}
      >
          {loading && <Loader/>}
          <Box sx={{
              width:"50%",
              display: "flex",
              justifyContent:"flex-start",
              flexDirection: "column",
              margin: "2rem",
              padding: "2rem",
              gap:"1rem",
              border: "1px solid black",
              borderRadius:"10px"
          }}>
              <Typography variant='h2'>{ jobDetails.name}</Typography>
              <Box container sx={{
                  display: "flex",
                  flexDirection:"row",
                  gap: "10rem",
              }}>
                  <Grid container sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: "1rem",

                  }}>
                    <Grid item>
                      <Typography variant='h5'>{jobDetails.company}</Typography>
                      </Grid>
                      <Grid item>
                      <Typography variant='h5'>{jobDetails.category}</Typography>
                  </Grid>
                  </Grid>
                  
                  <Grid container  sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      justifyItems:"flex-end",
                      gap: "1rem",
                     paddingLeft:" 8rem"

                  }}>
                      <Grid item>
                      <Typography variant='h6'>Salary - Rs.{ jobDetails.salary}</Typography>
                  </Grid>
                  
                  <Grid item>
                      <Typography >Valid Till: { jobDetails.validDate?.split("T")[0]}</Typography>
                  </Grid>
                  </Grid>
                </Box>
                  
                  <Grid container sx={{
                      height: "100px",

                  }}>
                      <Typography >{jobDetails.description}
                      </Typography>
                  </Grid>
              
              <Grid container sx={{
                  display: "flex",
                  justifyContent: "flex-end",
              }}>
                  <Button variant='contained'>Apply Now</Button>
              </Grid>
          </Box>
          </Box>
      </>
  )
}

export default JobDetails