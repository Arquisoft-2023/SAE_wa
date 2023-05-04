import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {Link} from "react-router-dom"
import logo from '../assets/Logo.png'
import { Box } from '@mui/material'
import React from 'react'

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const ModSidebarOpen=()=>{
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <Box>
      <Box className = "sidebarButton"
      sx = {{
        position: "sticky"
      }}
      onClick={ModSidebarOpen}
      >
        <ArrowBackIosNewIcon
        sx = {{
          position: "absolute",
          top: "48px",
          right: "-18px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          boxShadow: "0 0 4px white, 0 0 0 white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0,3s",
          transform: `${sidebarOpen ? 'none' : 'rotate(180deg)'}`,
          border: "none",
          letterSpacing: "inherit",
          color: "inherit",
            fontSize: "inherit",
            textAlign: "inherit",
            padding: "0",
            fontFamily: "inherit",
            outline: "none"
        }}
        />
      </Box>
      <Box 
      className = "logoContent"
      sx={{
        position: "sticky",
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "24px",
        "h2":{
          display: `${sidebarOpen ? 'block' : 'none'}`
        }
      }}
      >
        <Box className = "imgContent"
        sx = {{
          display: "flex",
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
          cursor: "pointer",
          transition: "all 0.3s",
          transform: `${sidebarOpen ? 'scale(0.5)' : 'scale(0.7)'}`
        }}
        >
          <img src={logo}/>
        </Box>
        <Box>
          <h2>SAE</h2>
        </Box>
      </Box>
      {linksArray.map(({text, label, to})=>(
        <Box 
        className="linkContainer"
        key = {label}
        sx={{
          margin: "8px 0",
          padding: "0 15px",
          ":hover": {
            background:"lightGrey",
          }
        }}
        >
          <Link to={to} className="Links" 
          style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              padding:"6px 0"
          }}>
            <Box className = "Linktext" 
            sx = {{
              padding: "8px 16px",
              display: "flex",
              "svg" : {
                fontSize: "25px",
              }
            }}
            >
              {sidebarOpen ? <span>{text}</span> : ""}
            </Box>
          </Link>
        </Box>
      ))}

    </Box>
  )
}

const linksArray=[
{
  label:"Home",
  text:"Inicio",
  to:"/"
},
{
  label:"Tutorias",
  text:"Tutorias",
  to:"/tutorias"
}
]

export default SideBar;