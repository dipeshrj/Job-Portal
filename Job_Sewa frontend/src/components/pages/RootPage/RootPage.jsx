import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import backgroundImage from '../image/Background-image.png'
import { useNavigate } from 'react-router-dom'


const RootPage = () => {
    const navigate =useNavigate()
  return (
     <>
      <Box sx={{
      height:"110vh",
      width: "100vw",
      backgroundColor: "lightblue",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity:"80%",
      display: "flex",
      flexDirection:"column",
      paddingTop: "2rem",
      }} >
        
          <Grid   sx={{
          display: "flex",
          flexDirection: "column",
          padding:" 0 1rem",
        }}>
          <Grid item sx={{
                  display: "flex",
                  justifyContent: "flex-end",
            gap: "1rem",
                  paddingRight:"2rem"               
              }}>
                  <Button onClick={() =>navigate('/login')} variant='outlined' >Sign in</Button>
                  <Button onClick={()=>navigate('/register') }variant='outlined' >Sign up</Button>
            </Grid>
          <Grid item sx={{
            padding:"0",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems:"center",
            }}> 
            <img
            src='\images\job-sewa-logo2.png'
            height={90}
            width={200}
              style={{
                objectFit: "contain",
              }} />
            <Typography variant='h6'>You are never too old to set a new goal or to dream a new dream</Typography>
            </Grid>
              
               
</Grid>
        
             
      </Box>
    </>
  )
}

export default RootPage