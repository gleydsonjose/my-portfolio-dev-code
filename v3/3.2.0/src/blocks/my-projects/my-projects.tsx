import React, {FC, useContext} from 'react';
import './my-projects.css';
import {stateIndexGroupContext, dispatchIndexGroupContext} from '../../index';

interface MyProjectsProjectsData {
  id: number;
  name: string;
  type: string;
  titleType: string;
  sourceCodeLink: string;
  websiteLink: string;
  imgSrc: string;
  imgAlt: string;
  description: string;
  imagesSlider: [
    {
      id: number,
      imgSrc: string,
      imgAlt: string
    }
  ];
}

interface MyProjectsProps {
  myProjectsData: {
    title: string,
    buttonText: string
  };
  projectsData: MyProjectsProjectsData[];
}

const MyProjects: FC<MyProjectsProps> = ({
  myProjectsData, projectsData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  const titleClass = `my-projects__title${nightModeStatus ?
    ' my-projects__title_night_mode' : ''}`;

  function openProjectsDetailsModal(productData: MyProjectsProjectsData) {
    dispatchIndexGroup({type: 'project-details-data', newStateValue: productData});
    dispatchIndexGroup({type: 'modal', modalName: 'project-details'});
  }

  return (
    <section className="my-projects">
      <h1 className={titleClass}>
        <i className="fas fa-project-diagram my-projects__title-icon"></i>
        {myProjectsData.title}
      </h1>
      <section className="my-projects__items-group">
        {projectsData.map!(item => 
          <div className="my-projects__item" key={item.id}>
            <img src={item.imgSrc} alt={item.imgAlt} className="my-projects__image"/>
            <button className="my-projects__button"
              onClick={() => openProjectsDetailsModal(item)}>
              <i className="fas fa-eye my-projects__button-icon"></i>
              {myProjectsData.buttonText}
            </button>
          </div>)}
      </section>
    </section>
  );
}

export default MyProjects;