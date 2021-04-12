import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import ClientsProjectsPage from './components/clientsprojectspage';
import MyProjectsPage from './components/myprojectspage';
import ContactMePage from './components/contactmepage';
import languageData from './json/languageData.json';
import axios from 'axios';

class Main extends React.Component {
  state = {
    currentPage: 'homepage',
    currentLanguage: 'en'
  }

  componentDidMount() {
    axios.get("https://ipinfo.io").then((response) => {
      this.startLanguage(response.data.country);
    }).catch((error) => {
      this.startLanguage("US");
      console.error(`${error} Error trying to find location`);
    })
  }

  startLanguage(language) {
    let currentLanguage;
    if(language === "BR") {
      currentLanguage = "ptbr";
    } else {
      currentLanguage = "en";
    }
    this.setState({currentLanguage})
  }

  handleLanguage = (language) => {
    this.setState({ currentLanguage: language})
  }

  handleChangePage = (currentPage) => {
    this.setState({currentPage});
  }

  render() {
    const {currentPage, currentLanguage} = this.state;

    return (
      <main id="main-body">
        <Navbar currentLanguage={currentLanguage} languageData={languageData}
          onChangeLanguage={this.handleLanguage} onChangePage={this.handleChangePage}
          currentPageStyle={currentPage}/>
        {currentPage === 'homepage' && <HomePage currentLanguage={currentLanguage}
          languageData={languageData} onChangePage={this.handleChangePage}/>}
        {currentPage === 'clientsprojectspage' && <ClientsProjectsPage currentLanguage={currentLanguage}
          languageData={languageData}/>}
        {currentPage === 'myprojectspage' && <MyProjectsPage currentLanguage={currentLanguage}
          languageData={languageData}/>}
        {currentPage === 'contactmepage' && <ContactMePage currentLanguage={currentLanguage}
          languageData={languageData}/>}
      </main>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector('#root'));