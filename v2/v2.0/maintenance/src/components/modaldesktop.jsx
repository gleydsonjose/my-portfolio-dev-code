import React from 'react';

class ModalDesktop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalDesktopImages: [],
      modalDesktopCurrentImage: []
    }
  }

  componentDidMount() {
    const {modalImages} = this.props;
    this.setState({ 
      modalDesktopImages: modalImages,
      modalDesktopCurrentImage: [modalImages[0].id, modalImages[0].image, modalImages[0].alt]
    });
  }

  handleChangeCurrentImage = (imageId) => {
    const {modalDesktopImages} = this.state;
    this.setState({
      modalDesktopCurrentImage: [modalDesktopImages[imageId].id, modalDesktopImages[imageId].image, modalDesktopImages[imageId].alt]
    })
  }

  render() {
    const {modalDesktopImages, modalDesktopCurrentImage} = this.state;
    const {languageData, currentLanguage} = this.props;
    const modalBtnClose = languageData[currentLanguage].modalBtnClose;

    return (
      <div id="modal-desktop-background" onClick={this.props.onCloseModal}>
        <div id="modal-desktop-foreground">
          <div id="modal-desktop-current-image">
            <img src={modalDesktopCurrentImage[1]} alt={modalDesktopCurrentImage[2]}/>
          </div>
          <div id="modal-desktop-aside-menu-body">
            <div id="modal-desktop-close-button">
              <button type="button" id="modal-desktop-close-button-child" onClick={this.props.onCloseModal}>
                <i className="fas fa-times-circle"></i>
                {modalBtnClose}
              </button>
            </div>
            <div id="modal-desktop-image-btngroup">
              {modalDesktopImages.map(imageData => {
                  let classImageData = 'modal-desktop-image-button-children';
                  classImageData += modalDesktopCurrentImage[0] === imageData.id ? " modal-desktop-image-active" : '';

                  return <div className={classImageData} key={imageData.id} onClick={() => this.handleChangeCurrentImage(imageData.id)}>
                    <img src={imageData.image} alt={imageData.alt}/>
                  </div>
                }
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDesktop;