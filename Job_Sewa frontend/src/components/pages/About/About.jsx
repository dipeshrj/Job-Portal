import React from 'react'
import { styled } from 'styled-components'
import AddCardIcon from "@mui/icons-material/AddCard";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";

const About = () => {
  return (
     <StyledDiv >
      <div style={{
        width: "50rem",
        textAlign: "center",
        background: "#fff",
  position: "absolute",
  top:" 50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "29rem",
  display: "flex",
  padding: "2.5rem 2rem 2rem 2rem",
  flexDirection: "column",
  gap: "1.5rem",
  borderRadius:" 8px",
  boxShadow: "300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  color: "#000"
  
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div>
            
          </div>
          <div>
            <p style={{
              textAlign: "center",
                width: "44rem"}}>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                // marginBottom: "2rem"
}
              }   >
                <StoreIcon />
                <ShoppingBagIcon />
                <AirplanemodeActiveIcon />
                <AddCardIcon />
              </div>
              Our Job Portal Website is a one-stop digital platform connecting job seekers with employers, simplifying the job search and recruitment process.
              Job seekers can browse an extensive range of job listings, upload resumes, and apply for positions with ease.The platform offers powerful search filters, personalized job recommendations, and valuable career resources, making it an invaluable tool for individuals seeking new career opportunities.
              For employers, our website provides a streamlined hiring process, with features for posting job openings, managing applicants, and conducting candidate evaluations.
              With a user-friendly interface and advanced matching algorithms, our Job Portal Website is a versatile and efficient solution for anyone navigating the modern job market.
              Whether you're looking for your dream job or seeking the perfect candidate, our platform is designed to make the process quick, convenient, and successful.
            </p>
          </div>
        </div>
      </div>
    </StyledDiv>
  )
}

export default About

const StyledDiv = styled.div`
    display: grid;
    place-content: center;
    height: 74vh;
    width: 100vw;
  `