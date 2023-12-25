import { CircularProgress, Grid, Pagination, Popover, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { $axios } from '../lib/axios';
import { useNavigate } from 'react-router-dom';


export default function JobCard(props) {
  const { _id, name, salary, category, company, description } = props
  const [loading, setLoading] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  // extract role from local storage
    const role= localStorage.getItem('role')


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // delete job
  const deleteJob = async (_id) => {
    try {
      handleClose()
      setLoading(true)
      await $axios.delete(`/job/delete/${_id}`)
      setLoading(false)
      props.setIsItemDeleted(!props.isItemDeleted)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <>
      {loading && <CircularProgress color="inherit" />}
      
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid sx={{padding:"1rem"}}>
        <Typography sx={{ p: 2 }}>Are you sure you want to delete this?</Typography>
          <Stack sx={
            {
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap:"1rem"
            }
          }>
            <Button size= 'small' variant='contained' onClick={()=>{deleteJob(_id)}}>Yes</Button>
            <Button size= 'small' variant='outlined' onClick={()=>{handleClose()}}>No</Button>
            
        </Stack>
        </Grid>
      </Popover>

      <Card
        // onClick={() => navigate(`/job/details/${_id}`)}
        sx={{
      display: "felx",
      justifyContent: "center",
      alignContent:"center",
      width:"60%",
          backgroundColor: "#e9e5ec",
    }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Grid container sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          
          
        }}>
          <Typography gutterBottom variant="h6" component="div">
          {company}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Rs.{salary}
        </Typography>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
          {role==="provider"&&
            <Button size="medium" onClick={(event) => { handleClick(event) }}><AiOutlineDelete size={25} /></Button> }
          <Button size="medium" onClick={() => navigate(`/job/details/${ _id }`)}>More Details</Button>
      </CardActions>
      </Card>
      
      </>
  );
}
