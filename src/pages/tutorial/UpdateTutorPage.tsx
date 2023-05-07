import {useState} from 'react';

import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import UpdateTutor from '../../components/tutorial/UpdateTutor'

interface TutorialState {
    tutorial: acompanyamiento
}

function UpdateTutorP () {
    const [tutorial, setTutorial] = useState<TutorialState["tutorial"]>();

    const handleNewTutorial = (newTutorial: acompanyamiento): void => {
        setTutorial(newTutorial)
    };

    return (
        <div className="profilePage-container">
            <div className="profilePage-body">
                <UpdateTutor onNewTutorial={handleNewTutorial} />
            </div>
        </div>
    );
};

export default UpdateTutorP;