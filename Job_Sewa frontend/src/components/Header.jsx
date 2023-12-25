import { Avatar, Badge, Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components';
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignContent:"center",
      height:"70px",
      width: "100vw",
      padding: "0.5rem",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      backgroundColor: "#9388af",

    }}>
      <Grid container sx={{
          display: "flex",
          justifyContent: "center",
          gap:"20rem",
          alignIContent: "center",  
        }}>
        <Grid item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          marginLeft:"10px"
          }}
        >
          <img
            src='\images\job-sewa-logo.png'
            height={140}
            width={140}
            style={{ objectFit: "contain" }} />
        </Grid>

        <Grid item
          sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
            gap: "3rem",
            height: "70px",          
        }}
        >
          <Link to='/home'><StyledLink variant="h4">Home</StyledLink></Link>
          <Link to='/jobs'><StyledLink variant="h4">Jobs</StyledLink></Link>
          <Link to='/about'><StyledLink variant="h4">About</StyledLink></Link>
        </Grid>

        <Grid item
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          height: "70px",
          alignItems: "center",
          }}
        >
          <Avatar alt="Chris Hemsworth" src="\images\avatar-image.png" sx={{ height: "50px", width: "50px" }} />
          <Button 
            onClick={() => navigate("/login")}><BiLogOut size={25} color='black' />
          </Button>
        </Grid>
        

      </Grid>
    </Box>
  )
}

export default Header


const StyledLink = styled(Typography)`
  color: #352F44
`