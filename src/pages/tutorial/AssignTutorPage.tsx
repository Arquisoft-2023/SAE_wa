import {useState} from 'react';

import { acompanyamiento } from '../../utils/types/tutorial/Acompanyamiento.interface'
import AssingTutor from '../../components/tutorial/AssingTutor';

interface TutorialState {
    tutorial: acompanyamiento
}

function AssignTutor () {
    const [tutorial, setTutorial] = useState<TutorialState["tutorial"]>();

    const handleNewTutorial = (newTutorial: acompanyamiento): void => {
        setTutorial(newTutorial)
    };

    return (
        <div className="profilePage-container">
            <div className="profilePage-body">
                <AssingTutor onNewTutorial={handleNewTutorial} />
            </div>
        </div>
    );
};

export default AssignTutor;