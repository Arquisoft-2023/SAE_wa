import { useEffect, useState } from 'react'
import { TipoRemisionAJAXRequest } from '../services/TipoRemisionAJAXRequest';
import { RemisionAJAXRequest } from '../services/RemisionAJAXRequest';

const TipoRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            //const tiposRemision =  await TipoRemisionAJAXRequest.tiposRemision();

            //const remisionUsuarioUn = await RemisionAJAXRequest.remisionUsuarioUn("julozanoa");
            /*const tipoRemisionArray = {
                tipoRemision: "Oftalmologia"
            }*/
            //const crearTipoRemision = await TipoRemisionAJAXRequest.crearTipoRemision(tipoRemisionArray);
            //setCharactersList(crearTipoRemision);

        })();
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