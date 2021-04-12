import React from 'react';

class ModalDesktop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalDesktopImages: [],
      modalDesktopCurrentImage: [],
      modalDesktopKeyImagesLoad: [],
      modalDesktopImageTransition: false,
      modalDesktopCurrentImageId: 0
    }
  }

  componentDidMount() {
    const {modalImages} = this.props;
    this.setState({ 
      modalDesktopImages: modalImages,
      modalDesktopCurrentImage: [modalImages[0].id, modalImages[0].image, modalImages[0].alt]
    });
  }

  componentWillUnmount() {
    this.setState({modalDesktopKeyImagesLoad: []});
  }

  handleChangeCurrentImage = (imageId) => {
    const {modalDesktopKeyImagesLoad, modalDesktopCurrentImageId} = this.state;

    if(modalDesktopKeyImagesLoad.indexOf(imageId) !== -1 && modalDesktopCurrentImageId !== imageId) {
      this.setState({
        modalDesktopImageTransition: true,
        modalDesktopCurrentImageId: imageId
      });
    }
  }

  modalDesktopLoadCurrentImage = (e) => {
    let keyimg = e.target.dataset.keyimg;
    let modalDesktopKeyImagesLoad = this.state.modalDesktopKeyImagesLoad;

    if(e.target.complete) {
      if(this.state.modalDesktopKeyImagesLoad.indexOf(keyimg) === -1) {
        modalDesktopKeyImagesLoad.push(parseInt(keyimg));
        this.setState({modalDesktopKeyImagesLoad});
      }
    }
  }

  modalDesktopChangeImage = () => {
    const {modalDesktopImages, modalDesktopCurrentImageId} = this.state;
    let imageId = modalDesktopCurrentImageId;

    this.setState({
      modalDesktopCurrentImage: [modalDesktopImages[imageId].id, modalDesktopImages[imageId].image, modalDesktopImages[imageId].alt],
      modalDesktopImageTransition: false
    })
  }

  render() {
    const {modalDesktopImages, modalDesktopCurrentImage} = this.state;
    const {languageData, currentLanguage} = this.props;
    const modalBtnClose = languageData[currentLanguage].modalBtnClose;
    let modalDesktopImageTransitionClass = this.state.modalDesktopImageTransition ? "transparent-transition-image" : "normal-transition-image";

    return (
      <div id="modal-desktop-background" onClick={this.props.onCloseModal}>
        <div id="modal-desktop-foreground">
          <div id="modal-desktop-current-image">
            <img src={modalDesktopCurrentImage[1]} alt={modalDesktopCurrentImage[2]} className={modalDesktopImageTransitionClass}
              onTransitionEnd={this.modalDesktopChangeImage}/>
          </div>
          <div id="modal-desktop-aside-menu-body">
            <div id="modal-desktop-close-button">
              <button type="button" id="modal-desktop-close-button-child" onClick={this.props.onCloseModal}>
                <i className="fas fa-times-circle" id="modal-desktop-close-button-child-icon"></i>
                {modalBtnClose}
              </button>
            </div>
            <div id="modal-desktop-image-btngroup">
              {modalDesktopImages.map(imageData => {
                let classImageData = 'modal-desktop-image-button-children';
                classImageData += modalDesktopCurrentImage[0] === imageData.id ? " modal-desktop-image-active" : '';

                return <div className={classImageData} key={imageData.id} onClick={() => this.handleChangeCurrentImage(imageData.id)}>
                  <img src={imageData.image} alt={imageData.alt} onLoad={this.modalDesktopLoadCurrentImage} data-keyimg={imageData.id}/>
                </div> 
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDesktop;