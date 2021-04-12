import React, {FC} from 'react';
import MyFavoriteProjects from '../my-favorite-projects/my-favorite-projects';
import AboutMe from '../about-me/about-me';
import ToolsICurrentlyUse from '../tools-i-currently-use/tools-i-currently-use';
import ToolsIHaveUsed from '../tools-i-have-used/tools-i-have-used';
import MyGitHub from '../my-github/my-github';
import './home.css';

interface HomeProps {
  languageDataHome: {
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
  }
}

const Home: FC<HomeProps> = ({
  languageDataHome
}) => {
  return (
    <section className="home">
      <MyFavoriteProjects
        myFavoriteProjectsData={languageDataHome.myFavoriteProjects}/>
      <AboutMe
        aboutMeData={languageDataHome.aboutMe}/>
      <ToolsICurrentlyUse
        toolsICurrentlyUseData={languageDataHome.toolsICurrentlyUse}/>
      <ToolsIHaveUsed
        toolsIHaveUsedData={languageDataHome.toolsIHaveUsed}/>
      <MyGitHub
        myGitHubData={languageDataHome.myGitHub}/>
    </section>
  );
}

export default Home;