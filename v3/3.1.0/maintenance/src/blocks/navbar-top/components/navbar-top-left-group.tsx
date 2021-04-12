import React, {FC, useState, useEffect, useContext} from 'react';
import {dispatchIndexGroupContext, stateIndexGroupContext} from '../../../index';
import {stateCurrentPageContext, setStateCurrentPageContext} from '../../main/main';

interface NavbarTopMenuProps {
  menuData: {
    homeText: string,
    projectsText: string
  };
}

const NavbarTopMenu: FC<NavbarTopMenuProps> = ({
  menuData
}) => {
  const stateCurrentPage = useContext(stateCurrentPageContext);
  const setStateCurrentPage = useContext(setStateCurrentPageContext);

  function handlePage(page: string) {
    setStateCurrentPage(page);
  }

  return (
    <ul className="navbar-top__menu">
      <li className={`navbar-top__menu-item${stateCurrentPage === 'home' ? ' navbar-top__menu-item_active' : ''}`}
        onClick={() => handlePage('home')}>{menuData.homeText}</li>
      <li className={`navbar-top__menu-item${stateCurrentPage === 'projects' ? ' navbar-top__menu-item_active' : ''}`}
        onClick={() => handlePage('projects')}>{menuData.projectsText}</li>
    </ul>
  );
}

interface NavbarTopNightModeButtonProps {
  nightModeData: {
    lightText: string,
    nightText: string
  };
}

const NavbarTopNightModeButton: FC<NavbarTopNightModeButtonProps> = ({
  nightModeData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  let NavbarTopNightModeIconContainer;

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour >= 5 && currentHour <= 17) {
      dispatchIndexGroup({type: 'night-mode', newStateValue: false});
    } else if(currentHour >= 0 && currentHour <= 4) {
      dispatchIndexGroup({type: 'night-mode', newStateValue: true});
    } else if(currentHour >= 18 && currentHour <= 23) {
      dispatchIndexGroup({type: 'night-mode', newStateValue: true});
    } else {
      dispatchIndexGroup({type: 'night-mode', newStateValue: false});
    }
  }, [dispatchIndexGroup])

  if(nightModeStatus) {
    NavbarTopNightModeIconContainer = <>
      <i className="fas fa-sun navbar-top__night-mode-icon"></i>
      {nightModeData.lightText}
    </>
  } else {
    NavbarTopNightModeIconContainer = <>
      <i className="fas fa-moon navbar-top__night-mode-icon"></i>
      {nightModeData.nightText}
    </>
  }

  function handleNightModeStatus() {
    dispatchIndexGroup({type: 'night-mode', newStateValue: !nightModeStatus});
  }

  return (
    <button className="navbar-top__night-mode-button" onClick={handleNightModeStatus}>
      {NavbarTopNightModeIconContainer}
    </button>
  );
}

interface NavbarTopSearchBarButtonProps {
  searchBarButtonData: {
    text: string
  };
}

const NavbarTopSearchBarButton: FC<NavbarTopSearchBarButtonProps> = ({
  searchBarButtonData
}) => {
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);

  function handleSearchBarStatus() {
    return dispatchIndexGroup({type: 'modal', modalName: 'search-bar'});
  }

  return (
    <button className="navbar-top__search-bar-button" onClick={handleSearchBarStatus}>
      <i className="fas fa-search navbar-top__search-bar-icon"></i>
      {searchBarButtonData.text}
    </button>
  );
}

interface NavbarTopLanguageSelectLanguages {
  id: number,
  imgSrc: string,
  imgAlt: string,
  text: string,
  languageTag: string,
  status: boolean
}

interface NavbarTopLanguageSelectProps {
  languageSelectData: {
    defaultText: string,
    languages: NavbarTopLanguageSelectLanguages[]
  }
}

const NavbarTopLanguageSelect: FC<NavbarTopLanguageSelectProps> = ({
  languageSelectData
}) => {
  const [selectStatus, setSelectStatus] = useState(false)
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  const currentLanguageTag = useContext(stateIndexGroupContext).currentLanguage;
  const currentLanguageData: NavbarTopLanguageSelectLanguages =
    languageSelectData.languages.filter(item => item.languageTag === currentLanguageTag)[0];
  const selectCurrentOption = {...currentLanguageData, status: true};
  let languageSelectTextContainer;

  if(selectCurrentOption.status) {
    languageSelectTextContainer = <>
      <img src={selectCurrentOption.imgSrc} alt={selectCurrentOption.imgAlt} className="navbar-top__language-select-text-icon"/>
      {selectCurrentOption.text}
    </>;
  } else {
    languageSelectTextContainer = languageSelectData.defaultText;
  }

  useEffect(() => {
    if(selectStatus) {
      function selectClickOutside(event: any) {
        const currentTargetClass = event.target.classList.value.split(' ')[0];

        if(currentTargetClass !== 'navbar-top__language-select-inner' &&
        currentTargetClass !== 'navbar-top__language-select-text' &&
        currentTargetClass !== 'navbar-top__language-select-icon' &&
        currentTargetClass !== 'navbar-top__language-option' &&
        currentTargetClass !== 'navbar-top__language-option-item' &&
        currentTargetClass !== 'navbar-top__language-option-icon') {
          setSelectStatus(false);
        }
      }
    
      document.addEventListener('click', selectClickOutside);
      return () => document.removeEventListener('click', selectClickOutside);
    }
  }, [selectStatus]);

  function handleLanguageSelectStatus() {
    setSelectStatus(!selectStatus);
  }

  function handleLanguageOption(languageTag: string) {
    dispatchIndexGroup({type: 'current-language', newStateValue: languageTag})
    setSelectStatus(false);
  }

  return (
    <div className="navbar-top__language-select">
      <div className="navbar-top__language-select-inner" onClick={handleLanguageSelectStatus}>
        <div className="navbar-top__language-select-inner-text">
          {languageSelectTextContainer}
        </div>
        <i className="fas fa-caret-down navbar-top__language-select-inner-icon"></i>
      </div>
      {selectStatus &&
        <ul className="navbar-top__language-option">
          {languageSelectData.languages.map(item => 
            <li className="navbar-top__language-option-item" key={item.id}
              onClick={() => handleLanguageOption(item.languageTag)}>
              <img src={item.imgSrc} alt={item.imgAlt} className="navbar-top__language-option-icon"/>
              {item.text}
            </li>)}
        </ul>}
    </div>
  );
}

interface NavbarTopLeftGroup {
  languageDataNavbarTopLeftGroup: {
    mainLogo: {
      imgSrc: string,
      imgAlt: string
    },
    menu: {
      homeText: string,
      projectsText: string
    },
    nightMode: {
      lightText: string,
      nightText: string
    },
    searchBarButton: {
      text: string
    },
    languageSelect: {
      defaultText: string,
      languages: [
        {
          id: number,
          imgSrc: string,
          imgAlt: string,
          text: string,
          languageTag: string,
          status: boolean
        }
      ]
    }
  }
}

export const NavbarTopLeftGroup: FC<NavbarTopLeftGroup> = ({
  languageDataNavbarTopLeftGroup
}) => {
  const mainLogoData = languageDataNavbarTopLeftGroup.mainLogo;
  const menuData = languageDataNavbarTopLeftGroup.menu;
  const nightModeData = languageDataNavbarTopLeftGroup.nightMode;
  const searchBarButtonData = languageDataNavbarTopLeftGroup.searchBarButton;
  const languageSelectData = languageDataNavbarTopLeftGroup.languageSelect;

  return (
    <section className="navbar-top__left-group">
      <img src={mainLogoData.imgSrc} alt={mainLogoData.imgAlt} className="navbar-top__logo"/>
      <NavbarTopMenu
        menuData={menuData}/>
      <NavbarTopNightModeButton
        nightModeData={nightModeData}/>
      <NavbarTopSearchBarButton
        searchBarButtonData={searchBarButtonData}/>
      <NavbarTopLanguageSelect
        languageSelectData={languageSelectData}/>
    </section>
  );
}

export default NavbarTopLeftGroup;