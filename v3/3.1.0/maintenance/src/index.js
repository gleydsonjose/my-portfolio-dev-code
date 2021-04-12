import React, { useReducer, createContext } from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import Main from './blocks/main/main';
import Modal from './blocks/modal/modal';
import languageDataAPI from './api/languageData.json';
function reducerIndexGroup(state, action) {
    switch (action.type) {
        case 'modal':
            switch (action.modalName) {
                case 'search-bar':
                    return {
                        ...state,
                        modals: {
                            ...state.modals,
                            searchBarModalStatus: !state.modals.searchBarModalStatus
                        }
                    };
                case 'project-details':
                    return {
                        ...state,
                        modals: {
                            ...state.modals,
                            projectDetailsModalStatus: !state.modals.projectDetailsModalStatus
                        }
                    };
                default:
                    throw new Error("This modal don't exist!");
            }
        case 'project-details-data':
            return { ...state, projectDetailsData: action.newStateValue };
        case 'current-language':
            return { ...state, currentLanguage: action.newStateValue };
        case 'night-mode':
            return { ...state, nightModeStatus: action.newStateValue };
        default:
            throw new Error("This component isn't allowed!");
    }
}
let currentLanguage = 'en';
fetch('https://ipinfo.io').then(response => {
    response.json().then(json => {
        if (json.country === 'BR') {
            currentLanguage = 'ptbr';
        }
        else {
            currentLanguage = 'en';
        }
    }).catch(error => {
        currentLanguage = 'en';
        console.error("Error with ipinfo json");
    });
}).catch(error => {
    console.error("Error with ipinfo");
});
const initialStateIndexGroup = {
    modals: {
        searchBarModalStatus: false,
        projectDetailsModalStatus: false
    },
    projectDetailsData: {
        id: 0,
        name: '',
        type: '',
        titleType: '',
        sourceCodeLink: '',
        websiteLink: '',
        imgSrc: '',
        imgAlt: '',
        description: '',
        imagesSlider: [
            {
                id: 0,
                imgSrc: '',
                imgAlt: ''
            }
        ]
    },
    currentLanguage,
    nightModeStatus: false
};
export const stateIndexGroupContext = createContext(initialStateIndexGroup);
export const dispatchIndexGroupContext = createContext((action) => { });
const App = () => {
    const [indexGroupState, indexGroupDispatch] = useReducer(reducerIndexGroup, initialStateIndexGroup);
    const currentLanguageIndex = indexGroupState.currentLanguage;
    const languageData = languageDataAPI;
    let ModalContainer = '';
    if (indexGroupState.modals.searchBarModalStatus ||
        indexGroupState.modals.projectDetailsModalStatus) {
        document.querySelector('body').style.overflow = 'hidden';
        ModalContainer =
            <Modal languageDataModal={languageData[currentLanguageIndex].modal} languageDataProjectData={languageData[currentLanguageIndex].projectsData}/>;
    }
    else {
        document.querySelector('body').style.overflow = 'visible';
        ModalContainer = '';
    }
    return (<stateIndexGroupContext.Provider value={indexGroupState}>
      <dispatchIndexGroupContext.Provider value={indexGroupDispatch}>
        <Main languageData={languageData[currentLanguageIndex]}/>
        {ModalContainer}
      </dispatchIndexGroupContext.Provider>
    </stateIndexGroupContext.Provider>);
};
ReactDOM.render(<App />, document.getElementById('root'));