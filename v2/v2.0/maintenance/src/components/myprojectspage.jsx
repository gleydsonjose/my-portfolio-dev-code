import React from 'react';
import ModalDesktop from './modaldesktop';
import ModalMobile from './modalmobile';

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myProjects: []
    }
  }

  componentDidMount() {
    const {languageData, currentLanguage} = this.props;
    const myProjects = languageData[currentLanguage].myprojectspage.myProjects;
    this.setState({ myProjects });
  }

  componentDidUpdate(prevProp) {
    const {languageData, currentLanguage} = this.props;
    if(prevProp.currentLanguage !== currentLanguage) {
      const myProjects = languageData[currentLanguage].myprojectspage.myProjects;
      this.setState({ myProjects });
    }
  }

  handleShowDescription = (projectId) => {
    const myProjects = this.state.myProjects.map(project => {
      const descriptionStatusNew = projectId === project.id ? true : project.descriptionStatus;
      const myProject = {id: project.id, name: project.name, image: project.image, alt: project.alt, site: project.site, sourceCode: project.sourceCode, description: project.description, descriptionStatus: descriptionStatusNew}
      return myProject;
    });
    this.setState({myProjects});
  }

  handleHideDescription = (projectId) => {
    const myProjects = this.state.myProjects.map(project => {
      const descriptionStatusNew = projectId === project.id ? false : project.descriptionStatus;
      const myProject = {id: project.id, name: project.name, image: project.image, alt: project.alt, site: project.site, sourceCode: project.sourceCode, description: project.description, descriptionStatus: descriptionStatusNew}
      return myProject;
    });
    this.setState({myProjects});
  }

  render() {
    const {languageData, currentLanguage} = this.props;
    const myProjectPage = languageData[currentLanguage].myprojectspage;
    const {myProjects} = this.state;

    return (
      <div id="my-projects-body">
        {myProjects.map(project =>
          <div className="my-projects" key={project.id}>
            <h3>{project.name}</h3>
            <div className="my-project-data">
              <div className="my-project-image">
                <img src={project.image} alt={project.alt}/>
              </div>
              <div className="my-project-btngroup">
                <div className="my-project-button">
                  <button type="button" onClick={() => this.props.onOpenModal(project.modalImages)} title={myProjectPage.myProjectButton[0].title}>
                    <i className="fas fa-images"></i>
                  </button>
                </div>
                <div className="my-project-button">
                  <a href={project.site} target="_blank" rel="noopener noreferrer" title={myProjectPage.myProjectButton[1].title}>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
                <div className="my-project-button">
                  <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" title={myProjectPage.myProjectButton[2].title}>
                    <i className="fas fa-code"></i>
                  </a>
                </div>
              </div>
              <div className="my-project-description-body">
                {!project.descriptionStatus && 
                  <button type="button" className="my-project-description-btn" onClick={() => this.handleShowDescription(project.id)}>
                    <i className="fas fa-arrow-alt-circle-down"></i>
                    {myProjectPage.myProjectsDescription.buttonOpenDescriptionText}
                  </button>
                }
                {project.descriptionStatus &&
                  <React.Fragment>
                    <p className="my-project-description">{project.description}</p>
                    <button type="button" className="my-project-description-btn-close" onClick={() => this.handleHideDescription(project.id)}>
                      <i className="fas fa-times-circle"></i>
                      {myProjectPage.myProjectsDescription.buttonCloseDescriptionText}
                    </button>
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class MyProjectsFCC extends React.Component {
  state = {
    myProjectsFCC: []
  }

  componentDidMount() {
    const {languageData, currentLanguage} = this.props;
    const myProjectsFCC = languageData[currentLanguage].myprojectspage.myProjectsFCC;
    this.setState({ myProjectsFCC });
  }

  render() {
    const {languageData, currentLanguage} = this.props;
    const myProjectPage = languageData[currentLanguage].myprojectspage;
    const {myProjectsFCC} = this.state;

    return(
      <div id="my-projects-fcc-body">
      {myProjectsFCC.map(project => 
        <div className="my-projects-fcc" key={project.id}>
          <h3>{project.name}</h3>
          <div className="my-project-fcc-data">
            <div className="my-project-fcc-image">
              <img src={project.image} alt={project.alt}/>
            </div>
            <div className="my-project-fcc-codepen-body">
              <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="my-project-fcc-codepen-btn">
                <i className="fab fa-codepen"></i>
                {myProjectPage.myProjectsFCCDescription.buttonSourceCode}
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
}

class MyProjectsPage extends React.Component {
  state = {
    modalStatus: false,
    modalImages: []
  }

  handleOpenModal = (modalImages) => {
    this.setState({ 
      modalImages,
      modalStatus: !this.state.modalStatus && true
    });
  }

  handleCloseModal = (e) => {
    const elementId = e.target.id;
    if(elementId === 'modal-desktop-background' || elementId === 'modal-desktop-close-button-child' || elementId === 'modal-mobile-background' || elementId === 'modal-mobile-close-button-child') {
      this.setState({ modalStatus: !this.state.modalStatus && true })
    }
  }

  render() {
    const {languageData, currentLanguage} = this.props;
    const myProjectPage = languageData[currentLanguage].myprojectspage;
    const {modalStatus, modalImages} = this.state;
    let modalDesktopActive, modalMobileActive;

    if(window.innerWidth > 900 && modalStatus) {
      modalDesktopActive = true;
    } else {
      modalDesktopActive = false;
    }

    if(window.innerWidth <= 900 && modalStatus) {
      modalMobileActive = true;
    } else {
      modalMobileActive = false;
    }

    return (
      <React.Fragment>
        <article id="my-projects-page-body">
          <section id="my-projects-page">
            <div id="my-projects-page-title">
              <i className="fas fa-project-diagram"></i>
              <h2>{myProjectPage.myProjectsPageTitle}</h2>
            </div>
            <MyProjects currentLanguage={currentLanguage} languageData={languageData}
              onOpenModal={this.handleOpenModal}/>
          </section>
          <section id="my-projects-fcc-page">
            <div id="my-projects-fcc-page-title">
              <i className="fab fa-free-code-camp"></i>
              <h2>{myProjectPage.myProjectsFCCPageTitle}</h2>
            </div>
            <MyProjectsFCC currentLanguage={currentLanguage} languageData={languageData}/>
          </section>
        </article>
        {modalDesktopActive && <ModalDesktop currentLanguage={currentLanguage} languageData={languageData} modalImages={modalImages} onCloseModal={this.handleCloseModal}/>}
        {modalMobileActive && <ModalMobile currentLanguage={currentLanguage} languageData={languageData} modalImages={modalImages} onCloseModal={this.handleCloseModal}/>}
      </React.Fragment>
    );
  }
}

export default MyProjectsPage;