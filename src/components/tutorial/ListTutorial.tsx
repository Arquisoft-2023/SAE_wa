import {useState} from 'react'

import { acompanyamiento } from '../../utils/types/tutorial/Acompanyamiento.interface'
import tutorialService from '../../utils/TutorialService'

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
        const response = await tutorialService.ListTutorialShortService()
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