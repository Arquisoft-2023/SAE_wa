import { Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'
import logo from '../assets/Logo.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {NavLink} from "react-router-dom"

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
      {sidebarOpen ?
      <Box
      className = "HomeContainer"
      sx={{
        position: "sticky",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <NavLink
        to="/"
        className="LinkHome"
        style={{
          textDecoration:"none"
        }}
        >
        <span>Home</span> 
        </NavLink>
      </Box> :
      ""}
      {sidebarOpen ? 
      <Box
      className = "Accordion"
      sx={{
        position:"sticky",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
      }}
      >
        {linksFuncionalidades.map(({label,text,links})=>(
        <Accordion
        className="LinkAccordion"
        key={label}
        sx={{
          position:"sticky",
          display:"flex",
          justifyContent:"center",
          alignContent:"center",
          flexDirection:"column",
          width:"100%"
        }}
        >
        <AccordionSummary
          expandIcon={<ExpandMore/>}
          id={text}
        >
          <Typography>{text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {links.map(({textl,to,label2})=>(
            <Box
            className="LinkContainer"
            key={label2}
            sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              margin: "8px 0",
              padding: "0 15px",
              ":hover": {
                background:"lightGrey",
              }
            }}
            >
              <NavLink to={to} className="Link"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                padding:"6px 0"
              }}
              >
                <Box
                className="LinkText"
                sx={{
                  padding: "8px 16px",
                  display: "flex",
                  "svg" : {
                    fontSize: "25px",
                  }
                }}
                >
                  <span
                  style={{
                    textAlign:"start"
                  }}
                  >{textl}</span>
                </Box>
              </NavLink>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
        ))}
      </Box> : 
      ""}
    </Box>
  )
}

const linksFuncionalidades = [
{
  label:"Formularios",
  text:"Formularios",
  links:[]
},
{
  label:"Remisiones",
  text:"Remisiones",
  links:[
    {
      label2:"Tipos de Remision",
      textl:"Tipos de Remision",
      to:"/tipo_remision"
    },
    {
      label2:"Generar Solicitud",
      textl:"Generar Solicitud",
      to:"/solicitud_remision"
    },
    {
      label2:"Primeras Escuchas",
      textl:"Primeras Escuchas",
      to:"/primera_escucha"
    },
    {
      label2:"Remisiones",
      textl:"Remisiones",
      to:"/remision"
    }
  ]
},
{
  label:"Tutorias",
  text:"Tutorias",
  links:[] 
}
]

export default SideBar;