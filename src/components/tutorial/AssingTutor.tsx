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

const AssingTutor = (prop: CreateProps) => {
    const {onNewTutorial} = prop

    const [inputValue, setInputValue] = useState<CreateState["inputValue"]>(INITIAL_STATE["inputValue"])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await acompanyamientoService.assingTutorService(inputValue)
        onNewTutorial(response)  
        console.log(response)     
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    return (
        <ul>
            <h1>Asignar tutor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label className="form-label" htmlFor="usuario_un_estudiante">Usuario Estudiante </label> */}
                    <input type="text" id="usuario_un_estudiante" name="usuario_un_estudiante" value={inputValue.usuario_un_estudiante} placeholder="Usuario estudiante" onChange={handleChange}/>
                </div>
                <div>
                <input type="text" id="usuario_un_tutor" name="usuario_un_tutor" value={inputValue.usuario_un_tutor} placeholder="Usuario tutor" onChange={handleChange}/>
                </div>
                <button type="submit">Guardar</button>
            </form>
        </ul>
    )
}

export default AssingTutor