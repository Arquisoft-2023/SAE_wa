import {useState} from 'react';

import { acompanyamiento } from '../../utils/types/tutorial/Acompanyamiento.interface'

interface TutorialState {
    tutorial: acompanyamiento
}

function CreateObs () {
    const [tutorial, setTutorial] = useState<TutorialState["tutorial"]>();

    const handleNewTutorial = (newTutorial: acompanyamiento): void => {
        setTutorial(newTutorial)
    };

    return (
        <div className="profilePage-container">
            <div className="profilePage-body">
                <h1>TODO: Crear observacion</h1>
            </div>
        </div>
    );
};

export default CreateObs;