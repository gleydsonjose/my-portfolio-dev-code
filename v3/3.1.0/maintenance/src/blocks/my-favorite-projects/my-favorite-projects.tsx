import React, {FC, useState, useContext} from 'react';
import './my-favorite-projects.css';
import {stateIndexGroupContext} from '../../index';
import useSlider from '../../utils/sliderReducerHook';

interface MyFavoriteProjectsProjects {
  id: number,
  imgSrc: string,
  imgAlt: string,
  description: string
}

interface MyFavoriteProjectsProps {
  myFavoriteProjectsData: {
    title: string,
    projects: MyFavoriteProjectsProjects[]
  };
}

const MyFavoriteProjects: FC<MyFavoriteProjectsProps> = ({
  myFavoriteProjectsData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const projects = myFavoriteProjectsData.projects;
  const [state, dispatch] = useSlider(projects.length);
  const titleClass = `my-favorite-projects__title${nightModeStatus ?
    ' my-favorite-projects__title_night_mode' : ''}`;
  const sliderClass = `my-favorite-projects__slider${nightModeStatus ?
    ' my-favorite-projects__slider_night_mode' : ''}`;
  const sliderDescriptionClass = `my-favorite-projects__slider-description${nightModeStatus ?
    ' my-favorite-projects__slider-description_night_mode' : ''}`;
  let sliderButtonBackClass = 'my-favorite-projects__slider-button';
  let sliderButtonBackDisabled = false;
  let sliderButtonNextClass = 'my-favorite-projects__slider-button';
  let sliderButtonNextDisabled = false;
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  if(currentImageLoaded === false) {
    sliderButtonBackClass+=' my-favorite-projects__slider-button_disabled';
    sliderButtonBackDisabled = true;
    sliderButtonNextClass+=' my-favorite-projects__slider-button_disabled';
    sliderButtonNextDisabled = true;
  } else {
    switch(state.currentNumProject) {
      case 0:
        sliderButtonBackClass+=' my-favorite-projects__slider-button_disabled';
        sliderButtonBackDisabled = true;
        break;
      case projects.length-1:
        sliderButtonNextClass+=' my-favorite-projects__slider-button_disabled';
        sliderButtonNextDisabled = true;
        break;
      default:
        sliderButtonBackClass = 'my-favorite-projects__slider-button';
        sliderButtonBackDisabled = false;
        sliderButtonNextClass = 'my-favorite-projects__slider-button';
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
    <section className="my-favorite-projects">
      <h1 className={titleClass}>
        <i className="fas fa-star my-favorite-projects__title-icon"></i>
        {myFavoriteProjectsData.title}
      </h1>
      <div className={sliderClass}>
        <img src={projects[state.currentNumProject].imgSrc}
          alt={projects[state.currentNumProject].imgAlt}
          className="my-favorite-projects__slider_image"
          onLoad={handleCurrentImageLoaded}/>
        <div className="my-favorite-projects__slider-btngroup">
          <button className={sliderButtonBackClass}
            onClick={clickSliderBtnBack}
            disabled={sliderButtonBackDisabled}>
            <i className="fas fa-chevron-left my-favorite-projects__slider-icon"></i>
          </button>
          {currentImageLoaded === false &&
            <img src="./images/loaders/loader.svg" alt="Loader"
              className="my-favorite-projects__slider-loader"/>}
          <button className={sliderButtonNextClass}
            onClick={clickSliderBtnNext}
            disabled={sliderButtonNextDisabled}>
            <i className="fas fa-chevron-right my-favorite-projects__slider-icon"></i>
          </button>
        </div>
        <p className={sliderDescriptionClass}>
          {projects[state.currentNumProject].description}
        </p>
      </div>
    </section>
  );
}

export default MyFavoriteProjects;