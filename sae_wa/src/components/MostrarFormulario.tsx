
import { TextField } from '@mui/material'
import React from 'react'

export const MostrarFormulario = () => {
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
      <h1>Formulario</h1>
      </div>
      <div style={{ marginBottom: "16px" }}>
        Documento: 12345678
      </div>
      <div style={{ marginBottom: "16px" }}>
        Nombre: Juan
      </div>
      <div style={{ marginBottom: "16px" }}>
        Apellido: Pérez
      </div>
      <div style={{ marginBottom: "16px" }}>
        Usuario UN: jperez
      </div>
      <div style={{ marginBottom: "16px" }}>
        Fecha de creación: 2023-04-27
      </div>
      <div style={{ marginBottom: "16px" }}>
        ID formulario: 987654
      </div>
      <div style={{ marginBottom: "16px" }}>
        Tipología del formulario: Encuesta de satisfacción
      </div>
      <div style={{ marginBottom: "16px" }}>
        Pregunta 1: ¿Cómo calificaría su experiencia en nuestro servicio?
      </div>
      <div style={{ marginBottom: "16px" }}>
        Respuesta 1: Excelente
      </div>
      <div style={{ marginBottom: "16px" }}>
        Peso 1: 5
      </div>
    </div>
  )
}

export default MostrarFormulario

