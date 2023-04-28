import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CrearFormulario = () => {
  const [preguntas, setPreguntas] = useState([{ pregunta: '', respuestas: [{ respuesta: '', peso: '' }] }]);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '', respuestas: [{ respuesta: '', peso: '' }] }]);
  };

  const agregarRespuesta = (index) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index].respuestas = [...newPreguntas[index].respuestas, { respuesta: '', peso: '' }];
    setPreguntas(newPreguntas);
  };

  const handleChange = (event, index, subindex) => {
    const { name, value } = event.target;
    const newPreguntas = [...preguntas];
    newPreguntas[index].respuestas[subindex][name] = value;
    setPreguntas(newPreguntas);
  };

  return (
    <>
      <h1>Crear Formulario</h1>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Documento" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Nombre" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Apellido" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Usuario UN" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Fecha de creacion" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="ID formulario" variant="outlined" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField id="outlined-basic" label="Tipologia del formulario" variant="outlined" />
      </div>
      {preguntas.map((pregunta, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <TextField
            id={`pregunta-${index}`}
            name="pregunta"
            label={`Pregunta ${index + 1}`}
            variant="outlined"
            value={pregunta.pregunta}
            onChange={(event) => handleChange(event, index, -1)}
          />
          {pregunta.respuestas.map((respuesta, subindex) => (
            <div key={subindex} style={{ display: 'flex', marginBottom: '8px' }}>
              <TextField
                id={`respuesta-${index}-${subindex}`}
                name="respuesta"
                label={`Respuesta ${subindex + 1}`}
                variant="outlined"
                value={respuesta.respuesta}
                onChange={(event) => handleChange(event, index, subindex)}
              />
              <TextField
                id={`peso-${index}-${subindex}`}
                name="peso"
                label={`Peso ${subindex + 1}`}
                variant="outlined"
                value={respuesta.peso}
                onChange={(event) => handleChange(event, index, subindex)}
              />
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={() => agregarRespuesta(index)}>
            Añadir respuesta
          </Button>
          {index === preguntas.length - 1 && (
            <Button variant="contained" color="primary" onClick={agregarPregunta}>
              Crear pregunta
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default CrearFormulario