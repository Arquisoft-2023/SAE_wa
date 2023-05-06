import React, { useEffect, useState } from 'react'
import AJAXRequest from '../utils/AJAXRequest';

const TipoRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        AJAXRequest.post("",{
            query: `
            query MyQuery {
                obtenerTiposremision {
                    idTipoRemision
                    tipoRemision
                }
            }
          `
        })
            .then(response => setCharactersList(response.data.data.obtenerTiposremision))
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