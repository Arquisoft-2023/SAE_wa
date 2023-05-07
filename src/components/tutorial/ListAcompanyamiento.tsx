import {useState} from 'react'

import { acompanyamientoService } from '../../services/tutorial/AcompanyamientoAJAXRequest'
import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'

interface CreateState {
    inputValue: acompanyamiento
}

interface CreateProps{
    onNewTutorial: (tutorial: acompanyamiento) => void
}

const INITIAL_STATE: CreateState = {
    inputValue: {
        usuario_un_estudiante: '',
        usuario_un_tutor: '',
    }
}


const ListTutorial = () => {
    const [charactersList, setCharactersList] = useState([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // const response = await acompanyamientoService.ListAcompanyamientoService()
        const response = await acompanyamientoService.ListAcompanyamientoShortService()
        setCharactersList(response)
        console.log(response)
    }
    
    return (
        <ul>
            <h1>Listar Tutorias</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Listar</button>
                <pre>
                    {JSON.stringify(charactersList, null, 2)}
                </pre>
            </form>
        </ul>
    )
}

export default ListTutorial