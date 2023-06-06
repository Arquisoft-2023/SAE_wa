import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";
import LogoSae from "./LogoSae";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import userStore from "../state/zustand";
import { ExpandMore } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { NavLink, Navigate } from "react-router-dom";
import { SigninAJAXRequest } from "../services/signin/SigninAJAXRequest";
import { acompanyamientoService } from "../services/tutorial/AcompanyamientoAJAXRequest";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from "@mui/material";

const SideBar = ({ sidebarOpen, setSidebarOpen, showByRole }) => {
  // const usuarioRol = userStore((state) => state.usuarioRol) as string | null;
  // const usuarioUn = userStore((state) => state.usuarioUn);
  // const clearUser = userStore((state) => state.clearUser);
  const { usuarioUn, usuarioRol, clearUser } = userStore();
  const [tutor, setTutor] = useState("Sin asignar");

  const usuarioRolModified = usuarioRol
    ? usuarioRol.charAt(0).toUpperCase() + usuarioRol.slice(1)
    : null;

  const handleGetTutor = async (): Promise<any> => {
    try {
      const res = await acompanyamientoService.GetTutorService(usuarioUn);
      if (res?.status === 200 && !res.data.data.obtenerTutor.includes("400")) {
        setTutor(res.data.data.obtenerTutor);
      }
    } catch (error) {
      alert(`Error: $error`);
    }
  };

  useEffect(() => {
    handleGetTutor();
  }, []);

  const handleLogout = async () => {
    try {
      await SigninAJAXRequest.logoutAG(usuarioUn);
      <Navigate to={"/signin"} />;
      setTutor("Sin asignar");
      clearUser();
    } catch (error) {
      alert(`Error: $error`);
    }
  };
  const ModSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box>
      <Box
        className="sidebarButton"
        sx={{
          position: "sticky"
        }}
        onClick={ModSidebarOpen}
      >
        <ArrowBackIosNewIcon
          sx={{
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
            transform: `${sidebarOpen ? "none" : "rotate(180deg)"}`,
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
        className="logoContent"
        sx={{
          position: "sticky",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "24px",
          h2: {
            display: `${sidebarOpen ? "block" : "none"}`
          }
        }}
      >
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LogoSae />
          <Badge
            badgeContent={usuarioRolModified}
            sx={{
              display: `${sidebarOpen ? "block" : "none"}`,
              "& .MuiBadge-badge": {
                color: "#fff",
                backgroundColor: "#000"
              }
            }}
          ></Badge>
        </Box>
      </Box>
      {sidebarOpen ? (
        <Box
          className="HomeContainer"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <NavLink
              to="/home"
              className="LinkHome"
              style={{
                textDecoration: "none"
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "black"
                  }
                }}
              >
                <HomeIcon />
              </Button>
            </NavLink>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "#000",
                "&:hover": {
                  bgcolor: "#000"
                }
              }}
            >
              <LogoutIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3rem"
            }}
          >
            {usuarioRolModified === "Estudiante" ? (
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#b9b9b9",
                  padding: "5px"
                }}
              >
                Tutor: {tutor}
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
      {sidebarOpen ? (
        <Box
          className="Accordion"
          sx={{
            position: "sticky",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {linksFuncionalidades.map(
            ({ label, text, links, role1, role2, role3 }) => (
              <Accordion
                className="LinkAccordion"
                key={label}
                sx={{
                  position: "sticky",
                  display:
                    role1 === showByRole ||
                    role2 === showByRole ||
                    role3 === showByRole
                      ? "flex"
                      : "none",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} id={text}>
                  <Typography>{text}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {links.map(({ textl, to, label2, role1, role2 }) => (
                    <Box
                      className="LinkContainer"
                      key={label2}
                      sx={{
                        display:
                          role1 === showByRole || role2 === showByRole
                            ? "flex"
                            : "none",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "8px 0",
                        padding: "0 15px",
                        ":hover": {
                          background: "lightGrey"
                        }
                      }}
                    >
                      <NavLink
                        to={to}
                        className="Link"
                        style={{
                          display:
                            role1 === showByRole || role2 === showByRole
                              ? "flex"
                              : "none",
                          alignItems: "center",
                          textDecoration: "none",
                          padding: "6px 0",
                          color: "black"
                        }}
                      >
                        <Box
                          className="LinkText"
                          sx={{
                            padding: "8px 16px",
                            display: "flex",
                            svg: {
                              fontSize: "25px"
                            }
                          }}
                        >
                          <span
                            style={{
                              textAlign: "start"
                            }}
                          >
                            {textl}
                          </span>
                        </Box>
                      </NavLink>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )
          )}
          <Box
            sx={{
              marginTop: "2rem"
            }}
          >
            <h5
              style={{
                color: "#e8e8e8",
                fontFamily: "sans-serif"
              }}
            >
              v1.0
            </h5>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

const linksFuncionalidades = [
  {
    label: "Remisiones",
    text: "Remisiones",
    links: [
      {
        label2: "Tipos de Remision",
        textl: "Tipos de Remision",
        to: "/tipo_remision",
        role1: "bienestar",
        role2: "docente"
      },
      {
        label2: "Solicitudes de Remision",
        textl: "Solicitudes de Remision",
        to: "/solicitud_remision",
        role1: "bienestar",
        role2: "docente"
      },
      {
        label2: "Primeras Escuchas",
        textl: "Primeras Escuchas",
        to: "/primera_escucha",
        role1: "bienestar"
      },
      {
        label2: "Remisiones",
        textl: "Remisiones",
        to: "/remision",
        role1: "bienestar"
      }
    ],
    role1: "bienestar",
    role2: "docente"
  },
  {
    label: "Tutorias",
    text: "Tutorias",
    links: [
      {
        textl: "Gestionar tutor",
        to: "/tutorias/tutor",
        role1: "bienestar"
      },
      {
        textl: "Ver tutorias",
        to: "/tutorias/ver",
        role1: "bienestar"
      },
      {
        textl: "Gestionar tutorias",
        to: "/tutorias/tutorias",
        role1: "docente",
        role2: "estudiante"
      },
      {
        textl: "Lugares",
        to: "/tutorias/lugares",
        role1: "bienestar",
        role2: "estudiante",
        role3: "docente"
      }
    ],
    role1: "bienestar",
    role2: "estudiante",
    role3: "docente"
  },
  {
    label: "Observaciones",
    text: "Observaciones",
    links: [
      {
        textl: "Obervaciones",
        to: "/observaciones/obs",
        role1: "docente",
        role2: "estudiante"
      }
    ],
    role1: "docente",
    role2: "estudiante"
  },
  {
    label: "GestionUsuarios",
    text: "Gestion de Usuarios",
    links: [
      {
        label2: "Usuarios",
        textl: "Usuarios",
        to: "/usuarios",
        role1: "bienestar"
      },
      {
        label2: "Roles",
        textl: "Roles",
        to: "/roles",
        role1: "bienestar"
      },
      {
        label2: "UsuariosRoles",
        textl: "Usuarios y Roles",
        to: "/usuarios_roles",
        role1: "bienestar"
      }
    ],
    role1: "bienestar"
  }
];

export default SideBar;
