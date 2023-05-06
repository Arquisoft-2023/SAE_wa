import {useState} from 'react';

import { acompanyamiento } from '../../utils/types/tutorial/Acompanyamiento.interface'
import ListTutorial from '../../components/tutorial/ListTutorial'

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
                <ListTutorial />
            </div>
        </div>
    );
};

export default ListTutorialP;