import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const TipoRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
    Axios.post("http://127.0.0.8:3121/remisiones/remisiones", {
        headers: {
            contentType: "application/json"
        },
        query: `
            query MyQuery {
                obtenerTiposremision {
                    idTipoRemision
                    tipoRemision
            }
            }
          `
    })
        .then(response => {
            setCharactersList(response.data.data.obtenerTiposremision);
        })
  }, []);  
  return (
    <div>
        <h2>Tipos Remision</h2>
        <pre>
            {JSON.stringify(charactersList, null, 2)}
        </pre>
    </div>
  )
}

export default TipoRemision;