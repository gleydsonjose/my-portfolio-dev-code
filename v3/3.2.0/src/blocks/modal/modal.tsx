import React, {FC, useContext} from 'react';
import './modal.css';
import SearchBarModal from '../search-bar-modal/search-bar-modal';
import ProjectDetailsModal from '../project-details-modal/project-details-modal';
import {stateIndexGroupContext, dispatchIndexGroupContext} from '../../index';

interface ModalProps {
  languageDataModal: {
    searchBarModal: {
      inputPlaceholder: string
    },
    projectDetailsModal: {
      buttonSourceCodeText: string,
      buttonWebsiteText: string,
      descriptionTitle: string
    }
  };
  languageDataProjectData: [
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

const Modal: FC<ModalProps> = ({
  languageDataModal, languageDataProjectData
}) => {
  const stateModals = useContext(stateIndexGroupContext).modals;
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const dispatchIndexGroup = useContext(dispatchIndexGroupContext);
  let InnerModalContainer: any = '';
  const innerClass = `modal__inner${nightModeStatus ? ' modal__inner_night_mode' : ''}`;
  const closeButtonClass = `fas fa-times modal__close-button${nightModeStatus ?
    ' modal__close-button_night_mode' : ''}`;

  if(stateModals.searchBarModalStatus) {
    InnerModalContainer =
      <SearchBarModal
        searchBarModalData={languageDataModal.searchBarModal}
        projectsData={languageDataProjectData}/>;
  } else if(stateModals.projectDetailsModalStatus) {
    InnerModalContainer =
      <ProjectDetailsModal
        projectDetailsModalData={languageDataModal.projectDetailsModal}/>
  } else {
    InnerModalContainer = '';
  }

  function closeModal(event: any) {
    const modalCurrentClass = event.target.classList.value.split(' ');
     
    if(modalCurrentClass[0] === 'modal' ||
      modalCurrentClass[2] === 'modal__close-button') {
      if(stateModals.searchBarModalStatus) {
        dispatchIndexGroup({type: 'modal', modalName: 'search-bar'});
        dispatchIndexGroup({type: 'project-details-data', newStateValue: {}});
      } else if (stateModals.projectDetailsModalStatus) {
        dispatchIndexGroup({type: 'modal', modalName: 'project-details'});
        dispatchIndexGroup({type: 'project-details-data', newStateValue: {}});
      }
    }
  }

  return (
    <section className={`modal${stateModals.projectDetailsModalStatus ? ' modal_big_size' : ''}`}
      onClick={closeModal}>
      <div className={innerClass}>
        <div className="modal__first-group">
          <i className={closeButtonClass}></i>
        </div>
        <div className="modal__last-group">
          {InnerModalContainer}
        </div>
      </div>
    </section>
  );
}

export default Modal;