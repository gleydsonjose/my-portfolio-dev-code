import React, {FC, useState, useEffect, useContext} from 'react';
import './my-github.css';
import {stateIndexGroupContext} from '../../index';

interface MyGitHubProps {
  myGitHubData: {
    title: string,
    imgAlt: string,
    repositoriesTitle: string
  }
}

const MyGitHub: FC<MyGitHubProps> = ({
  myGitHubData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const titleClass = `my-github__title${nightModeStatus ?
    ' my-github__title_night_mode' : ''}`;
  const detailsClass = `my-github__details${nightModeStatus ?
    ' my-github__details_night_mode' : ''}`;
  const [gitHubData, setGitHubData] = useState({profileImg: '', repositoriesTotal: 0});
  
  useEffect(() => {
    fetch('https://api.github.com/users/satuctkode')
    .then((data) => {
      data.json().then((json) => {
        setGitHubData({
          profileImg: json.avatar_url,
          repositoriesTotal: json.public_repos
        });
      })
    })
    .catch((error) => {
      throw new Error(error);
    })
  }, [])

  return (
    <section className="my-github">
      <h1 className={titleClass}>
        <i className="fab fa-github my-github__title-icon"></i>
        {myGitHubData.title}
      </h1>
      <div className={detailsClass}>
        <img src={gitHubData.profileImg} alt={myGitHubData.imgAlt} className="my-github__profile-img"/>
        <div className="my-github__repositories">
          <h1 className="my-github__repositories-title">{myGitHubData.repositoriesTitle}</h1>
          <p className="my-github__repositories-total">{gitHubData.repositoriesTotal}</p>
        </div>
      </div>
    </section>
  );
}

export default MyGitHub;