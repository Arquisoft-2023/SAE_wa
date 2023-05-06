import {useState} from 'react';

import { acompanyamiento } from '../../utils/types/tutorial/Acompanyamiento.interface'
import CreateTutorial from '../../components/tutorial/CreateTutorial';

interface TutorialState {
    tutorial: acompanyamiento
}

function TutoriasRouter () {
    const [tutorial, setTutorial] = useState<TutorialState["tutorial"]>();

    const handleNewTutorial = (newTutorial: acompanyamiento): void => {
        setTutorial(newTutorial)
    };

    return (
        <div className="profilePage-container">
            <div className="profilePage-body">
                <CreateTutorial onNewTutorial={handleNewTutorial} />
            </div>
        </div>
    );
};

export default TutoriasRouter;