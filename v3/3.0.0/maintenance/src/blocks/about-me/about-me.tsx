import React, {FC, useContext} from 'react';
import './about-me.css';
import {stateIndexGroupContext} from '../../index';

interface AboutMeProps {
  aboutMeData: {
    title: string,
    text: string
  }
}

const AboutMe: FC<AboutMeProps> = ({
  aboutMeData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const titleClass = `about-me__title${nightModeStatus ? ' about-me__title_night_mode' : ''}`;
  const textClass = `about-me__text${nightModeStatus ? ' about-me__text_night_mode' : ''}`;

  return (
    <section className="about-me">
      <h1 className={titleClass}>
        <i className="fas fa-scroll about-me__title-icon"></i>
        {aboutMeData.title}
      </h1>
      <p className={textClass}>{aboutMeData.text}</p>
    </section>
  );
}

export default AboutMe;