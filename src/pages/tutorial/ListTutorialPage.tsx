import {useState} from 'react';

import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import ListAcompanyamiento from '../../components/tutorial/ListAcompanyamiento'

interface TutorialState {
    tutorial: acompanyamiento
}

function ListTutorialP () {
    const [tutorial, setTutorial] = useState<TutorialState["tutorial"]>();

    const handleNewTutorial = (newTutorial: acompanyamiento): void => {
        setTutorial(newTutorial)
    };

    return (
        <div className="profilePage-container">
            <div className="profilePage-body">
                <ListAcompanyamiento />
            </div>
        </div>
    );
};

export default ListTutorialP;