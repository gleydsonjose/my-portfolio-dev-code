import React from 'react';
import ModalDesktop from './modaldesktop';
import ModalMobile from './modalmobile';

class ClientsProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientsProjects: []
    }
  }

  componentDidMount() {
    const {languageData, currentLanguage} = this.props;
    const clientsProjects = languageData[currentLanguage].clientsprojectspage.clientsProjects;
    this.setState({ clientsProjects });
  }

  componentDidUpdate(prevProp) {
    const {languageData, currentLanguage} = this.props;
    if(prevProp.currentLanguage !== currentLanguage) {
      const clientsProjects = languageData[currentLanguage].clientsprojectspage.clientsProjects;
      this.setState({ clientsProjects });
    }
  }

  handleShowDescription = (projectId) => {
    const clientsProjects = this.state.clientsProjects.map(project => {
      const descriptionStatusNew = projectId === project.id ? true : project.descriptionStatus;
      const clientsProject = {id: project.id, name: project.name, image: project.image, alt: project.alt, site: project.site, sourceCode: project.sourceCode, description: project.description, descriptionStatus: descriptionStatusNew}
      return clientsProject;
    });
    this.setState({clientsProjects});
  }

  handleHideDescription = (projectId) => {
    const clientsProjects = this.state.clientsProjects.map(project => {
      const descriptionStatusNew = projectId === project.id ? false : project.descriptionStatus;
      const clientsProject = {id: project.id, name: project.name, image: project.image, alt: project.alt, site: project.site, sourceCode: project.sourceCode, description: project.description, descriptionStatus: descriptionStatusNew}
      return clientsProject;
    });
    this.setState({clientsProjects});
  }

  render() {
    const {languageData, currentLanguage} = this.props;
    const clientsProjectsPage = languageData[currentLanguage].clientsprojectspage;
    const {clientsProjects} = this.state;

    return (
      <div id="clients-projects-body">
        {clientsProjects.map(project => 
          <div className="clients-projects" key={project.id}>
            <h3>{project.name}</h3>
            <div className="client-project-data">
              <div className="client-project-image">
                <img src={project.image} alt={project.alt}/>
              </div>
              <div className="client-project-btngroup">
                <div className="client-project-button">
                  <button type="button" onClick={() => this.props.onOpenModal(project.modalImages)} title={clientsProjectsPage.clientsProjectButton[0].title}>
                    <i className="fas fa-images"></i>
                  </button>
                </div>
                <div className="client-project-button">
                  <a href={project.site} target="_blank" rel="noopener noreferrer" title={clientsProjectsPage.clientsProjectButton[1].title}>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
              <div className="client-project-description-body">
                {!project.descriptionStatus && 
                  <button type="button" className="client-project-description-btn" onClick={() => this.handleShowDescription(project.id)}>
                    <i className="fas fa-arrow-alt-circle-down"></i>
                    {clientsProjectsPage.clientsProjectsDescription.buttonOpenDescriptionText}
                  </button>
                }
                {project.descriptionStatus &&
                  <React.Fragment>
                    <p className="client-project-description">{project.description}</p>
                    <button type="button" className="client-project-description-btn-close" onClick={() => this.handleHideDescription(project.id)}>
                      <i className="fas fa-times-circle"></i>
                      {clientsProjectsPage.clientsProjectsDescription.buttonCloseDescriptionText}
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

class ClientsProjectsPage extends React.Component {
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
    const clientsProjectsPageTitle = languageData[currentLanguage].clientsprojectspage.clientsProjectsPageTitle;
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

    return(
      <React.Fragment>
        <article id="clients-projects-page-body">
          <section id="clients-projects-page">
            <div id="clients-projects-page-title">
              <i className="fas fa-users"></i>
              <h2>{clientsProjectsPageTitle}</h2>
            </div>
            <ClientsProjects currentLanguage={currentLanguage} languageData={languageData}
              onOpenModal={this.handleOpenModal}/>
          </section>
        </article>
        {modalDesktopActive && <ModalDesktop currentLanguage={currentLanguage} languageData={languageData} modalImages={modalImages} onCloseModal={this.handleCloseModal}/>}
        {modalMobileActive && <ModalMobile currentLanguage={currentLanguage} languageData={languageData} modalImages={modalImages} onCloseModal={this.handleCloseModal}/>}
      </React.Fragment>
    );
  }
}

export default ClientsProjectsPage;