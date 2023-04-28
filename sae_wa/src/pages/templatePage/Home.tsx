import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import Ejemplo from "../../components/CrearFormulario";
import CrearFormulario from "../../components/CrearFormulario";
import MostrarFormulario from "../../components/MostrarFormulario";
import MostrarFormularios from "../../components/MostrarFormularios";

const Home = () => {
  return <><Box
  sx={{
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }}
  >
      <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex_start",
        justifyContent: "flex_start",
        width: "25vw"
      }}
      >
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Formularios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListItem button>
            <ListItemText primary="Crear formulario" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Modificar formulario" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Borrar formulario" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Consular  formularios" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Consultar un formulario" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Consultar tamizajes" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Consultar tamisaje estudiante" />
          </ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Remisiones</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <ListItem button>
            <ListItemText primary="Solicitud de remision" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Remisiones" />
          </ListItem>
      </AccordionDetails>
    </Accordion>
        
    </Box>
    <Box
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "75vw",
      padding: "1rem",
    }}
  >
  <MostrarFormularios></MostrarFormularios>
  </Box>
  </Box>
  </>
};

export default Home;
