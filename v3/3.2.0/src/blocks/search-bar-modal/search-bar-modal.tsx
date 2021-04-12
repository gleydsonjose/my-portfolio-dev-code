import React, {FC, useState, useEffect, useContext, useRef, MouseEvent, ChangeEvent} from 'react';
import './search-bar-modal.css';
import {stateIndexGroupContext, dispatchIndexGroupContext} from '../../index';

interface SearchBarModalProjectsData {
  id: number,
  name: string,
  type: string,
  titleType: string,
  sourceCodeLink: string,
  websiteLink: string,
  imgSrc: string,
  imgAlt: string,
  description: string,
  imagesSlider: [
    {
      id: number,
      imgSrc: string,
      imgAlt: string
    }
  ]
}

interface SearchBarModalProps {
  searchBarModalData: {
    inputPlaceholder: string
  };
  projectsData: SearchBarModalProjectsData[];
}

const SearchBarModal: FC<SearchBarModalProps> = ({
  searchBarModalData, projectsData
}) => {
  const [searchBarStateValue, setSearchBarStateValue] = useState('');
  const [newSearchBarProjectsList, setNewSearchBarProjectsList] = useState<SearchBarModalProjectsData[]>([]);
  const [searchBarSubmitStatus, setSearchBarSubmitStatus] = useState<boolean>(false);
  const [searchBarDataChosen, setSearchBarDataChosen] = useState<SearchBarModalProjectsData>();
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const searchBarRef = useRef<HTMLInputElement>(null);
  const inputClass = `search-bar-modal__input${nightModeStatus ?
    ' search-bar-modal__input_night_mode' : ''}`;
  let submitButtonClass = 'search-bar-modal__submit-button';
  const listClass = `search-bar-modal__list${nightModeStatus ?
    ' search-bar-modal__list_night_mode' : ''}`;

  if(nightModeStatus) {
    if(searchBarSubmitStatus) {
      submitButtonClass = `search-bar-modal__submit-button
        search-bar-modal__submit-button_night_mode`;
    } else {
      submitButtonClass = `search-bar-modal__submit-button 
        search-bar-modal__submit-button_night_mode
        search-bar-modal__submit-button_night_mode-btn-disabled`;
    }
  } else {
    if(searchBarSubmitStatus) {
      submitButtonClass = 'search-bar-modal__submit-button';
    } else {
      submitButtonClass = 'search-bar-modal__submit-button search-bar-modal__submit-button_disabled';
    }
  }

  useEffect(() => {
    searchBarRef.current!.focus();
  }, [])

  function searchProjects(event: ChangeEvent<HTMLInputElement>) {
    const searchBarEventValue = event.target.value;
    const searchBarRegex = new RegExp(`^${searchBarEventValue}`, 'i');
    let searchBarDataFound = projectsData.filter!(item => searchBarRegex.test(item.name) && item.name);

    if(searchBarDataFound.length === 1 && searchBarDataFound[0].name === searchBarEventValue) {
      setSearchBarDataChosen(searchBarDataFound[0]);
      setSearchBarSubmitStatus(true);
      searchBarDataFound = [];
    } else {
      setSearchBarDataChosen(undefined);
      setSearchBarSubmitStatus(false);
      dispatchIndexGroup({type: 'project-details-data', newStateValue: {}});
    }

    if(searchBarEventValue.length > 0) {
      setNewSearchBarProjectsList(searchBarDataFound);
    } else {
      setNewSearchBarProjectsList([]);
    }

    setSearchBarStateValue(searchBarEventValue);
  }

  function submitData(event: MouseEvent) {
    event.preventDefault();
    dispatchIndexGroup({type: 'modal', modalName: 'search-bar'});
    dispatchIndexGroup({type: 'modal', modalName: 'project-details'});
    dispatchIndexGroup({type: 'project-details-data', newStateValue: searchBarDataChosen});
  }

  function selectProject(projectData: SearchBarModalProjectsData) {
    setSearchBarStateValue(projectData.name);
    setNewSearchBarProjectsList([]);
    setSearchBarDataChosen(projectData);
    setSearchBarSubmitStatus(true);
    searchBarRef.current!.focus();
  }

  return (
    <section className="search-bar-modal">
      <form className="search-bar-modal__form" method="POST">
        <input type="search" placeholder={searchBarModalData.inputPlaceholder} className={inputClass} value={searchBarStateValue}
          onChange={searchProjects} ref={searchBarRef}
          maxLength={50}/>
        <button type="submit" className={submitButtonClass} onClick={submitData}
          disabled={searchBarSubmitStatus === false && true}>
          <i className="fas fa-search search-bar-modal__submit-icon"></i>
        </button>
      </form>
      {newSearchBarProjectsList.length > 0 &&
        <ul className={listClass}>
          {newSearchBarProjectsList.map(item =>
            <li className="search-bar-modal__item" key={item.id} onClick={() => selectProject(item)}>{item.name}</li>)}
        </ul>}
    </section>
  );
}

export default SearchBarModal;