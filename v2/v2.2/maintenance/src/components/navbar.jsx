import React from 'react';

const LanguageBtnGroup = (props) => {
  const {languageData, currentLanguage, onChangeLanguage} = props;
  const languageBtnGroup = languageData[currentLanguage].navbar.languageBtnGroup;

  return (
    <ul id="language-btngroup">
      <li title={languageBtnGroup[0].title} onClick={() => onChangeLanguage('ptbr')}>
        <img src="/images/br-flag.png" alt={languageBtnGroup[0].alt}/>
      </li>
      <li title={languageBtnGroup[1].title} onClick={() => onChangeLanguage('en')}>
        <img src="/images/us-flag.png" alt={languageBtnGroup[0].alt}/>
      </li>
    </ul>
  );
}
  
const MenuList = (props) => {
  const {languageData, currentLanguage, onChangePage, currentPageStyle} = props;
  const homePageBtn = currentPageStyle === 'homepage' ? 'navbar-btn-active' : '';
  const clientsProjectsPageBtn = currentPageStyle === 'clientsprojectspage' ? 'navbar-btn-active' : '';
  const myProjectsPageBtn = currentPageStyle === 'myprojectspage' ? 'navbar-btn-active' : '';
  const contactMePageBtn = currentPageStyle === 'contactmepage' ? 'navbar-btn-active' : '';
  const menuList = languageData[currentLanguage].navbar.menuList;

  return (
    <ul id="menu-list">
      <li id="home-btn" className={homePageBtn} onClick={() => onChangePage('homepage')}>
        <i className="fas fa-home"></i>
        <span>{menuList[0].listItem}</span>
      </li>
      <li id="clients-projects-btn" className={clientsProjectsPageBtn} onClick={() => onChangePage('clientsprojectspage')}>
        <i className="fas fa-users"></i>
        <span>{menuList[1].listItem}</span>
      </li>
      <li id="my-projects-btn" className={myProjectsPageBtn} onClick={() => onChangePage('myprojectspage')}>
        <i className="fas fa-project-diagram"></i>
        <span>{menuList[2].listItem}</span>
      </li>
      <li id="contact-me-btn" className={contactMePageBtn} onClick={() => onChangePage('contactmepage')}>
        <i className="fas fa-comment"></i>
        <span>{menuList[3].listItem}</span>
      </li>
    </ul>
  );  
}
  
const Navbar = (props) => {
  const {languageData, currentLanguage, onChangePage, onChangeLanguage, currentPageStyle} = props;

  return (
    <nav id="main-navbar">
      <div id="logo-body-portfolio">
        <img src="images/sk-logo.png" alt="Logo SatuctKode" id="logo-img-portfolio"/>
      </div>
      <div id="menu-navbar">
        <LanguageBtnGroup currentLanguage={currentLanguage} languageData={languageData}
          onChangeLanguage={onChangeLanguage}/>
        <MenuList currentLanguage={currentLanguage} languageData={languageData}
          onChangePage={onChangePage} currentPageStyle={currentPageStyle}/>
      </div>
    </nav>
  );
}

export default Navbar;