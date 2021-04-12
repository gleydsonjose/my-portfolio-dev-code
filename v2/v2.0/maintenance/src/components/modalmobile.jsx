import React from 'react';

class ModalMobile extends React.Component {
  state = {
    modalMobileImages: [],
    modalMobileCurrentImage: [],
    modalMobileCurrentImageIndex: 0
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
    const {modalMobileCurrentImageIndex, modalMobileImages} = this.state;
    const currentImageIndexNew = modalMobileCurrentImageIndex > 0 ? modalMobileCurrentImageIndex - 1 : 0;
    this.setState({
      modalMobileCurrentImageIndex: currentImageIndexNew,
      modalMobileCurrentImage: [modalMobileImages[currentImageIndexNew].id, modalMobileImages[currentImageIndexNew].image, modalMobileImages[currentImageIndexNew].alt]
    });
  }

  handleButtonRight = () => {
    const {modalMobileCurrentImageIndex, modalMobileImages} = this.state;
    const currentImageIndexNew = modalMobileCurrentImageIndex < 3 ? modalMobileCurrentImageIndex + 1 : 3;
    this.setState({
      modalMobileCurrentImageIndex: currentImageIndexNew,
      modalMobileCurrentImage: [modalMobileImages[currentImageIndexNew].id, modalMobileImages[currentImageIndexNew].image, modalMobileImages[currentImageIndexNew].alt]
    });
  }

  render() {
    const {modalMobileCurrentImage, modalMobileCurrentImageIndex} = this.state;
    const modalBtnLeftLimit = modalMobileCurrentImageIndex === 0 ? 'modal-mobile-btn-limit' : '';
    const modalBtnRightLimit = modalMobileCurrentImageIndex === 3 ? 'modal-mobile-btn-limit' : '';
    const {languageData, currentLanguage} = this.props;
    const modalBtnClose = languageData[currentLanguage].modalBtnClose;

    return (
      <div id="modal-mobile-background" onClick={this.props.onCloseModal}>
        <div id="modal-mobile-foreground">
          <div id="modal-mobile-close-button">
            <button type="button" id="modal-mobile-close-button-child" onClick={this.props.onCloseModal}>
              <i className="fas fa-times-circle"></i>
              {modalBtnClose}
            </button>
          </div>
          <div id="modal-mobile-image-body">
            <div id="modal-mobile-current-image">
              <img src={modalMobileCurrentImage[1]} alt={modalMobileCurrentImage[2]}/>
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