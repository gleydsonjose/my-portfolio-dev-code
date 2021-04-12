import React, {FC, useState, useContext} from 'react';
import './project-details-modal.css';
import {stateIndexGroupContext} from '../../index';
import useSlider from '../../utils/sliderReducerHook';

interface ProjectDetailsData {
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

interface ProjectDetailsModalProps {
  projectDetailsModalData: {
    buttonSourceCodeText: string,
    buttonWebsiteText: string,
    descriptionTitle: string
  };
}

const ProjectDetailsModal: FC<ProjectDetailsModalProps> = ({
  projectDetailsModalData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const projectDetailsData: ProjectDetailsData = useContext(stateIndexGroupContext).projectDetailsData;
  const projectDetailsSliderData = projectDetailsData.imagesSlider;
  const [state, dispatch] = useSlider(projectDetailsSliderData.length);
  const titleBodyClass = `project-details-modal__title-body${nightModeStatus ?
    ' project-details-modal__title-body_night_mode' : ''}`;
  const titleItemClass = `project-details-modal__title-item${nightModeStatus ?
    ' project-details-modal__title-item_night_mode' : ''}`;
  const sliderClass = `project-details-modal__slider${nightModeStatus ?
    ' project-details-modal__slider_night_mode' : ''}`;
  const buttonItemClass = `project-details-modal__button-item${nightModeStatus ?
    ' project-details-modal__button-item_night_mode' : ''}`;
  const descriptionClass = `project-details-modal__description${nightModeStatus ?
    ' project-details-modal__description_night_mode' : ''}`;
  const descriptionTitleClass = `project-details-modal__description-title${nightModeStatus ?
    ' project-details-modal__description-title_night_mode' : ''}`;
  let sliderButtonBackClass = 'project-details-modal__slider-button';
  let sliderButtonBackDisabled = false;
  let sliderButtonNextClass = 'project-details-modal__slider-button';
  let sliderButtonNextDisabled = false;
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  if(currentImageLoaded === false) {
    sliderButtonBackClass+=' project-details-modal__slider-button_disabled';
    sliderButtonBackDisabled = true;
    sliderButtonNextClass+=' project-details-modal__slider-button_disabled';
    sliderButtonNextDisabled = true;
  } else {
    switch(state.currentNumProject) {
      case 0:
        sliderButtonBackClass+=' project-details-modal__slider-button_disabled';
        sliderButtonBackDisabled = true;
        break;
      case projectDetailsSliderData.length-1:
        sliderButtonNextClass+=' project-details-modal__slider-button_disabled';
        sliderButtonNextDisabled = true;
        break;
      default:
        sliderButtonBackClass = 'project-details-modal__slider-button';
        sliderButtonBackDisabled = false;
        sliderButtonNextClass = 'project-details-modal__slider-button';
        sliderButtonNextDisabled = false;
    }
  }

  function handleCurrentImageLoaded() {
    setCurrentImageLoaded(true);
  }

  function clickSliderBtnBack() {
    dispatch({button: 'back'});
    setCurrentImageLoaded(false);
  }

  function clickSliderBtnNext() {
    dispatch({button: 'next'});
    setCurrentImageLoaded(false);
  }

  return (
    <section className="project-details-modal">
      <div className={titleBodyClass}>
        <i className="fas fa-project-diagram project-details-modal__title-icon"></i>
        <p className="project-details-modal__title-inner">
          <span className={titleItemClass}>{projectDetailsData.titleType}</span>
          <span className={titleItemClass}>{projectDetailsData.name}</span>
        </p>
      </div>
      <div className={sliderClass}>
        <img src={projectDetailsSliderData[state.currentNumProject].imgSrc}
          alt={projectDetailsSliderData[state.currentNumProject].imgAlt}
          className="project-details-modal__slider_image"
          onLoad={handleCurrentImageLoaded}/>
        <div className="project-details-modal__slider-btngroup">
          <button className={sliderButtonBackClass}
            onClick={clickSliderBtnBack}
            disabled={sliderButtonBackDisabled}>
            <i className="fas fa-chevron-left project-details-modal__slider-icon"></i>
          </button>
          {currentImageLoaded === false &&
            <img src="./images/loaders/loader.svg" alt="Loader"
              className="project-details-modal-projects__slider-loader"/>}
          <button className={sliderButtonNextClass}
            onClick={clickSliderBtnNext}
            disabled={sliderButtonNextDisabled}>
            <i className="fas fa-chevron-right project-details-modal__slider-icon"></i>
          </button>
        </div>
      </div>
      <div className="project-details-modal__button-group">
        {projectDetailsData.type !== 'customerProjects' &&
          <a href={projectDetailsData.sourceCodeLink} className={buttonItemClass}
            target="_blank" rel="noopener noreferrer">
            <i className="fas fa-code project-details-modal__button-icon"></i>
            {projectDetailsModalData.buttonSourceCodeText}
          </a>}
        <a href={projectDetailsData.websiteLink} className={buttonItemClass}
          target="_blank" rel="noopener noreferrer">
          <i className="fas fa-external-link-alt project-details-modal__button-icon"></i>
          {projectDetailsModalData.buttonWebsiteText}
        </a>
      </div>
      <div className={descriptionClass}>
        <h1 className={descriptionTitleClass}>
          <i className="fas fa-file-alt project-details-modal__description-title-icon"></i>
          {projectDetailsModalData.descriptionTitle}
        </h1>
        <p className="project-details-modal__description-text">
          {projectDetailsData.description}
        </p>
      </div>
    </section>
  );
}

export default ProjectDetailsModal;