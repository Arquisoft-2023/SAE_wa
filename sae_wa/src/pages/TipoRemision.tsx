import { useEffect, useState } from 'react'
import { TipoRemisionAJAXRequest } from '../services/TipoRemisionAJAXRequest';
import { Box } from '@mui/material';
import DataTable from '../components/DataTable';

const TipoRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            const tiposRemision =  await TipoRemisionAJAXRequest.tiposRemision();

            setCharactersList(tiposRemision);

            /*const tipoRemisionArray = {
                tipoRemision: "Oftalmologia"
            }*/
            //const crearTipoRemision = await TipoRemisionAJAXRequest.crearTipoRemision(tipoRemisionArray);
            //setCharactersList(crearTipoRemision);

        })();
    }, []);

    const columns = [
        {field: 'idTipoRemision', headerName: 'ID', align: "center"},
        {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center"},
    ];

    charactersList.forEach((item)=>{
        console.log(item.idTipoRemision);
    });

    const rows = charactersList.map((item) => ({
        idTipoRemision: item.idTipoRemision, tipoRemision: item.tipoRemision,
    }))

    return (
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none"
        }}
        >
            <DataTable rows={rows} columns={columns}/>
        </Box>
    )
}

export default TipoRemision;