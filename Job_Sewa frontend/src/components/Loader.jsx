import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
      <>
          <Box sx={{
              display: "flex",
              justifyContent:"center"
          }}>
              <CircularProgress color="inherit" />
          </Box>
      </>
  )
}

export default Loader