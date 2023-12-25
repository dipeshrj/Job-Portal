import { Box, Typography } from '@mui/material'
import React from 'react'
import backgroundImage from '../image/Background-image.png'

const Job = () => {
  return (
    <>
      <Box sx={{
      height:"428px",
      width: "100vw", backgroundColor: "lightblue",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity:"60%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      marginTop:"3rem"
      }} >
     {/* <Typography variant='h2'>You are never too old to set a new goal or to dream a new dream</Typography> */}

      </Box>
    </>
  )
}

export default Job