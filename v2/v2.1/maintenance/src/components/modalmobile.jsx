import React from 'react';

class ModalMobile extends React.Component {
  state = {
    modalMobileImages: [],
    modalMobileCurrentImage: [],
    modalMobileCurrentImageIndex: 0,
    modalMobileLoadCurrentImage: false,
    modalMobileImageTransition: false,
    modalMobileBtnClicked: "btnLeft"
  }

  componentDidMount() {
    const {modalImages} = this.props;
    this.setState({ 
      modalMobileImages: modalImages,
      modalMobileCurrentImage: [modalImages[0].id, modalImages[0].image, modalImages[0].alt],
      modalMobileCurrentImageIndex: modalImages[0].id
    });
  }

  handleButtonLeft = () => {
    const {modalMobileCurrentImageIndex} = this.state;    

    if(modalMobileCurrentImageIndex > 0) {
      const currentImageIndexNew = modalMobileCurrentImageIndex > 0 ? modalMobileCurrentImageIndex - 1 : 0;

      this.setState({
        modalMobileImageTransition: true,
        modalMobileCurrentImageIndex: currentImageIndexNew,
        modalMobileLoadCurrentImage: currentImageIndexNew === 0 ? true : false,
        modalMobileBtnClicked: "btnLeft"
      });
    }
  }

  handleButtonRight = () => {
    const {modalMobileCurrentImageIndex, modalMobileLoadCurrentImage} = this.state;

    if(modalMobileCurrentImageIndex < 3) {
      const currentImageIndexNew = modalMobileCurrentImageIndex < 3 ? modalMobileCurrentImageIndex + 1 : 3;

      if(modalMobileLoadCurrentImage) {
        this.setState({
          modalMobileImageTransition: true,
          modalMobileCurrentImageIndex: currentImageIndexNew,
          modalMobileLoadCurrentImage: currentImageIndexNew === 3 ? true : false,
          modalMobileBtnClicked: "btnRight"
        });
      }
    }
  }

  modalMobileLoadCurrentImage = (e) => {
    if(e.target.complete) {
      this.setState({modalMobileLoadCurrentImage: true});
    }
  }

  modalMobileChangeImage = () => {
    const {modalMobileImages, modalMobileCurrentImageIndex, modalMobileBtnClicked} = this.state;
    const currentImageIndexNew = modalMobileCurrentImageIndex;

    if(modalMobileBtnClicked === "btnRight") {
      this.setState({
        modalMobileCurrentImage: [modalMobileImages[currentImageIndexNew].id, modalMobileImages[currentImageIndexNew].image, modalMobileImages[currentImageIndexNew].alt],
        modalMobileImageTransition: false
      });
    } else {
      this.setState({
        modalMobileCurrentImage: [modalMobileImages[currentImageIndexNew].id, modalMobileImages[currentImageIndexNew].image, modalMobileImages[currentImageIndexNew].alt],
        modalMobileImageTransition: false
      });
    }
  }

  render() {
    const {modalMobileCurrentImage, modalMobileCurrentImageIndex} = this.state;
    const modalBtnLeftLimit = modalMobileCurrentImageIndex === 0 ? 'modal-mobile-btn-limit' : '';
    const modalBtnRightLimit = modalMobileCurrentImageIndex === 3 ? 'modal-mobile-btn-limit' : '';
    const {languageData, currentLanguage} = this.props;
    const modalBtnClose = languageData[currentLanguage].modalBtnClose;
    let modalMobileImageTransitionClass = this.state.modalMobileImageTransition ? "transparent-transition-image" : "normal-transition-image";

    return (
      <div id="modal-mobile-background" onClick={this.props.onCloseModal}>
        <div id="modal-mobile-foreground">
          <div id="modal-mobile-close-button">
            <button type="button" id="modal-mobile-close-button-child" onClick={this.props.onCloseModal}>
              <i className="fas fa-times-circle" id="modal-mobile-close-button-child-icon"></i>
              {modalBtnClose}
            </button>
          </div>
          <div id="modal-mobile-image-body">
            <div id="modal-mobile-current-image">
              <img src={modalMobileCurrentImage[1]} alt={modalMobileCurrentImage[2]} onLoad={this.modalMobileLoadCurrentImage}
                onTransitionEnd={this.modalMobileChangeImage} className={modalMobileImageTransitionClass}/>
            </div>
            <div id="modal-mobile-btn-left" className={modalBtnLeftLimit} onClick={this.handleButtonLeft}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div id="modal-mobile-btn-right" className={modalBtnRightLimit} onClick={this.handleButtonRight}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalMobile;