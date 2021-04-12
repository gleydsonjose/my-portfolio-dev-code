import React from 'react';

class Slider extends React.Component {
  state = {
    sliderBtnGroup: [
      {id: 0, active: true},
      {id: 1, active: false},
      {id: 2, active: false},
      {id: 3, active: false},
      {id: 4, active: false}
    ],
    sliderImages: [
      {image: '/images/slider/slider-1.png', legend: 'Metrix One'},
      {image: 'images/slider/slider-2.png', legend: 'OW Info Project'},
      {image: 'images/slider/slider-3.png', legend: 'SatuctGames Shop'},
      {image: 'images/slider/slider-4.png', legend: 'SatuctGames Shop'},
      {image: 'images/slider/slider-5.png', legend: 'JSA Project'}
    ],
    sliderCurrentImgData: ['images/slider/slider-1.png', 'Metrix One'],
    sliderCurrentImgIndex: 0,
    sliderInterval: ''
  }

  sliderInterval() {
    const sliderInterval = setInterval(() => {
      const {sliderBtnGroup, sliderImages, sliderCurrentImgIndex} = this.state;
      let imgIndex = sliderCurrentImgIndex;
      imgIndex = imgIndex < 4 ? imgIndex + 1 : 0;
      const sliderBtnGroupNew = sliderBtnGroup.map(button => 
        button.id === imgIndex ? {id: button.id, active: true} : {id: button.id, active: false});
      this.setState({
        sliderBtnGroup: sliderBtnGroupNew,
        sliderCurrentImgIndex: imgIndex,
        sliderCurrentImgData: [sliderImages[imgIndex].image, sliderImages[imgIndex].legend]
      });
    }, 3000);

    this.setState({sliderInterval});
  }
  
  componentDidMount() {
    this.sliderInterval();
  }

  componentWillUnmount() {
    const {sliderInterval} = this.state;
    this.setState({sliderInterval: clearInterval(sliderInterval)});
  }
  
  handleSliderButton = buttonId => {
    const sliderBtnGroup = this.state.sliderBtnGroup.map(button => 
        button.id === buttonId ? {id: button.id, active: true} : {id: button.id, active: false});
    this.setState({
      sliderBtnGroup,
      sliderCurrentImgData: [this.state.sliderImages[buttonId].image, this.state.sliderImages[buttonId].legend],
      sliderCurrentImgIndex: buttonId
    });
  }
  
  render () {
    return (
    <section id="slider-body">
      <ul id="slider-btngroup">
        {this.state.sliderBtnGroup.map(button => {
          let sliderButtonClass = 'slider-btngroup-children';
          sliderButtonClass += button.active ? ' slider-image-active' : '';
          return <li key={button.id} className={sliderButtonClass} onClick={() => this.handleSliderButton(button.id)}></li>
        })}
      </ul>
      <img src={this.state.sliderCurrentImgData[0]} alt={this.state.sliderCurrentImgData[1]} id="slider-images"/>
      <p className="slider-legend">{this.state.sliderCurrentImgData[1]}</p>
    </section>
    );
  };
}

const AboutMe = (props) => {
  const {languageData, currentLanguage} = props;
  const aboutMe = languageData[currentLanguage].homepage.aboutMe;

  return (
    <section id="about-me">
      <div id="about-me-title">
        <i className="fas fa-scroll"></i>
        <h2>{aboutMe.title}</h2>
      </div>
      <div id="about-me-text">
        <p>{aboutMe.text}</p>
      </div>
    </section>
  );
}

const MyTools = (props) => {
  const {languageData, currentLanguage} = props;
  const myTools = languageData[currentLanguage].homepage.myTools;

  const toolsImages = [
    {id: 0, image: '/images/myTools/html5.png', alt: 'HTML5'},
    {id: 1, image: '/images/myTools/css3.png', alt: 'CSS3'},
    {id: 2, image: '/images/myTools/js.png', alt: 'Javascript'},
    {id: 3, image: '/images/myTools/sass.png', alt: 'Sass'},
    {id: 4, image: '/images/myTools/react.png', alt: 'React'},
    {id: 5, image: '/images/myTools/vuejs.png', alt: 'VueJS'},
    {id: 6, image: '/images/myTools/bootstrap.png', alt: 'Bootstrap'},
    {id: 7, image: '/images/myTools/wordpress.png', alt: 'Wordpress'},
    {id: 8, image: '/images/myTools/php.png', alt: 'PHP'},
    {id: 9, image: '/images/myTools/mysql.png', alt: 'MySQL'},
    {id: 10, image: '/images/myTools/docker.png', alt: 'Docker'}
  ]

  return (
    <section id="my-tools">
      <div id="my-tools-title">
        <i className="fas fa-tools"></i>
        <h2>{myTools.title}</h2>
      </div>
      <div id="tools-body">
        {toolsImages.map(tool => 
          <div className="tools-children" key={tool.id}>
            <img src={tool.image} alt={tool.alt} title={tool.alt}/>
          </div>          
        )}
      </div>
    </section>
  );
}

const MyGitHub = (props) => {
  const {languageData, currentLanguage} = props;
  const myGitHub = languageData[currentLanguage].homepage.myGitHub;

  return (
    <section id="my-github">
      <div id="my-github-title">
        <i className="fab fa-github"></i>
        <h2>{myGitHub.title}</h2>
      </div>
      <div id="github-repository-body">
        <a href="https://github.com/satuctkode?tab=repositories" target="_blank" rel="noopener noreferrer" id="github-repository-inner">
          <div id="github-repository-image">
            <img src='/images/imgprofilegithub.jpeg' alt={myGitHub.githubRepositoryImageAlt}/>
          </div>
          <div id="github-repository-data">
            <p id="repository-title">{myGitHub.repositoryTitle}</p>
            <p id="total-repository">{myGitHub.totalRepository}</p>
          </div>
        </a>
      </div>
    </section>
  );
}

const ContactMeButton = (props) => {
  const {languageData, currentLanguage} = props;
  const contactMeButton = languageData[currentLanguage].homepage.contactMeFooterButton;

  return (
    <section id="contact-me-footer-button-body">
      <div id="contact-me-footer-button">
        <button type="button" onClick={() => props.onChangePage('contactmepage')}>
          <i className="fas fa-comment"></i>
          {contactMeButton.buttonText}
        </button>
      </div>
    </section>
  );
}
  
const HomePage = (props) => {
  const {languageData, currentLanguage, onChangePage} = props;
  
  return (
    <article id="homepage-body">
      <Slider/>
      <AboutMe currentLanguage={currentLanguage} languageData={languageData}/>
      <MyTools currentLanguage={currentLanguage} languageData={languageData}/>
      <MyGitHub currentLanguage={currentLanguage} languageData={languageData}/>
      <ContactMeButton currentLanguage={currentLanguage} languageData={languageData}
        onChangePage={onChangePage}/>
    </article>
  );
}

export default HomePage;