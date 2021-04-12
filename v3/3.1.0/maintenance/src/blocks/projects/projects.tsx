import React, {FC} from 'react';
import Alert from '../alert/alert';
import CustomerProjects from '../customer-projects/customer-projects';
import MyProjects from '../my-projects/my-projects';
import './projects.css';

interface ProjectsProps {
  languageDataProjects: {
    alert: {
      text: string;
      linkText: string;
    },
    customerProjects: {
      title: string,
      buttonText: string
    },
    myProjects: {
      title: string;
      buttonText: string;
    }
  };
  languageDataProjectsData: [
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
  ];
}

const Projects: FC<ProjectsProps> = ({
  languageDataProjects, languageDataProjectsData
}) => {
  const customerProjects = languageDataProjectsData.filter(item => item.type === 'customerProjects' && item);
  const myProjects = languageDataProjectsData.filter(item => item.type === 'myProjects' && item);

  return (
    <section className="projects">
      <Alert
        alertData={languageDataProjects.alert}/>
      <CustomerProjects
        customerProjectsData={languageDataProjects.customerProjects}
        projectsData={customerProjects}/>
      <MyProjects
        myProjectsData={languageDataProjects.myProjects}
        projectsData={myProjects}/>
    </section>
  );
}

export default Projects;