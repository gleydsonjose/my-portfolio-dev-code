import React, {FC, useContext} from 'react';
import './customer-projects.css';
import {stateIndexGroupContext, dispatchIndexGroupContext} from '../../index';

interface CustomerProjectsProjectsData {
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

interface CustomerProjectsProps {
  customerProjectsData: {
    title: string,
    buttonText: string
  };
  projectsData: CustomerProjectsProjectsData[];
}

const CustomerProjects: FC<CustomerProjectsProps> = ({
  customerProjectsData, projectsData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  const titleClass = `customer-projects__title${nightModeStatus ?
    ' customer-projects__title_night_mode' : ''}`;

  function openProjectsDetailsModal(productData: CustomerProjectsProjectsData) {
    dispatchIndexGroup({type: 'project-details-data', newStateValue: productData});
    dispatchIndexGroup({type: 'modal', modalName: 'project-details'});
  }

  return (
    <section className="customer-projects">
      <h1 className={titleClass}>
        <i className="fas fa-users customer-projects__title-icon"></i>
        {customerProjectsData.title}
      </h1>
      <section className="customer-projects__items-group">
        {projectsData.map(item => 
          <div className="customer-projects__item" key={item.id}>
            <img src={item.imgSrc} alt={item.imgAlt} className="customer-projects__image"/>
            <button className="customer-projects__button"
              onClick={() => openProjectsDetailsModal(item)}>
              <i className="fas fa-eye customer-projects__button-icon"></i>
              {customerProjectsData.buttonText}
            </button>
          </div>)}
      </section>
    </section>
  );
}

export default CustomerProjects;