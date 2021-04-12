import React, {FC, useState, createContext, useContext} from 'react';
import './main.css';
import NavbarTop from '../navbar-top/navbar-top';
import Home from '../home/home';
import Projects from  '../projects/projects';
import Footer from '../footer/footer';
import {stateIndexGroupContext} from '../../index';

export const stateCurrentPageContext = createContext('');
export const setStateCurrentPageContext = createContext<Function>(() => false);

interface MainProps {
  languageData: {
    home: {
      myFavoriteProjects: {
        title: string,
        projects: {
          id: number,
          imgSrc: string,
          imgAlt: string,
          description: string
        }[]
      },
      aboutMe: {
        title: string,
        text: string
      },
      toolsICurrentlyUse: {
        title: string,
        tools: [
          {
            id: number,
            imgSrc: string,
            imgAlt: string,
            title: string
          }
        ]
      },
      toolsIHaveUsed: {
        title: string,
        tools: [
          {
            id: number,
            imgSrc: string,
            imgAlt: string,
            title: string
          }
        ]
      },
      myGitHub: {
        title: string,
        imgAlt: string,
        repositoriesTitle: string,
        goToRepositories: string
      }
    },
    modal: {},
    navbarTop: {
      mainLogo: {},
      menu: {},
      nightMode: {},
      searchBarButton: {},
      languageSelect: {}
    },
    projects: {
      alert: {
        text: string;
        linkText: string;
      },
      customerProjects: {
        title: string,
        buttonText: string
      },
      myProjects: {
        title: string,
        buttonText: string
      }
    },
    projectsData: [
      {
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
    ],
    footer: {
      title: string;
    }
  };
}

const Main: FC<MainProps> = ({
  languageData
}) => {
  const [currentPage, setCurrentPage] = useState('home');
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const mainClass = `main${nightModeStatus ? ' main_night_mode': ''}`;
  let currentPageContainer: unknown = '';

  switch(currentPage) {
    case 'home':
      currentPageContainer =
        <Home languageDataHome={languageData.home}/>;
      break;
    case 'projects':
      currentPageContainer =
        <Projects languageDataProjects={languageData.projects}
          languageDataProjectsData={languageData.projectsData}/>;
      break;
    default:
      currentPageContainer = '';
      break;
  }

  return (
    <main className={mainClass}>
      <setStateCurrentPageContext.Provider value={setCurrentPage}>
        <stateCurrentPageContext.Provider value={currentPage}>
          <NavbarTop
            languageDataNavbarTop={languageData.navbarTop}/>
        </stateCurrentPageContext.Provider>
      </setStateCurrentPageContext.Provider>
      {currentPageContainer}
      <Footer
        languageDataFooter={languageData.footer}/>
    </main>
  );
}

export default Main;