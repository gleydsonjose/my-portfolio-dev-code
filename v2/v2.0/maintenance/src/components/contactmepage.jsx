import React from 'react';
import axios from 'axios';
import sendMessage from '../server/sendmessage.php';

const SocialMedia = (props) => {
  const {languageData, currentLanguage} = props;
  const socialMediaTitle = languageData[currentLanguage].contactmepage.socialMediaTitle;

  return (
    <section id="contact-me-social-media">
      <div id="contact-me-social-media-title">
        <i className="fas fa-hashtag"></i>
        <h2>{socialMediaTitle}</h2>
      </div>
      <div id="contact-me-social-media-list-body">
        <ul id="contact-me-social-media-list">
          <li id="contact-me-social-media-facebook">
            <a href="https://www.facebook.com/gleydsonjosedasilva" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li id="contact-me-social-media-linkedin">
            <a href="https://www.linkedin.com/in/gleydson-jose-8600a2189" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li id="contact-me-social-media-twitter">
            <a href="https://twitter.com/gleydsongst" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li id="contact-me-social-media-whatsapp">
            <a href="https://api.whatsapp.com/send?1=pt_BR&phone=55081988101515" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>
          <li id="contact-me-social-media-telegram">
            <a href="https://t.me/GleydsonJose" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

class SendMessage extends React.Component {
  state = {
    contactMeName: '',
    contactMeEmail: '',
    contactMeSubject: '',
    contactMeMessage: '',
    contactMeNameError: false,
    contactMeEmailError: false,
    contactMeSubjectError: false,
    contactMeMessageError: false,
    contactMessageSuccess: false
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    const {contactMeName, contactMeEmail, contactMeSubject, contactMeMessage} = this.state;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const inputRegex = /[a-z0-9]{2}/i;

    this.setState({
      contactMeNameError: !inputRegex.test(contactMeName),
      contactMeEmailError: !emailRegex.test(contactMeEmail),
      contactMeSubjectError: !inputRegex.test(contactMeSubject),
      contactMeMessageError: !inputRegex.test(contactMeMessage)
    }, () => {
      const {contactMeNameError, contactMeEmailError, contactMeSubjectError, contactMeMessageError} = this.state;

      if(!contactMeNameError && !contactMeEmailError && !contactMeSubjectError && !contactMeMessageError) {
        document.querySelector('#contact-me-loading-send-message').style.display = 'flex';

        let formData = new FormData();
        formData.append('contactMeName', contactMeName);
        formData.append('contactMeEmail', contactMeEmail);
        formData.append('contactMeSubject', contactMeSubject);
        formData.append('contactMeMessage', contactMeMessage);
        axios.post(sendMessage, formData
          ).then(response => {
            if(response.data) {
              this.setState({contactMessageSuccess: true});

              setTimeout(() => {
                this.setState({contactMessageSuccess: false});
              }, 3000);
            }

            document.querySelector('#contact-me-loading-send-message').style.display = 'none';
          }
          ).catch(error => console.log(error));
      }
    })

    e.preventDefault();
  }

  render() {
    const {languageData, currentLanguage} = this.props;
    const sendMessage = languageData[currentLanguage].contactmepage.sendMessage;
    const {contactMeNameError, contactMeEmailError, contactMeSubjectError, contactMeMessageError, contactMessageSuccess} = this.state;
    const contactMeNameBorderError = contactMeNameError ? 'input-error' : '';
    const contactMeEmailBorderError = contactMeEmailError ? 'input-error' : '';
    const contactMeSubjectBorderError = contactMeSubjectError ? 'input-error' : '';
    const contactMeMessageBorderError = contactMeMessageError ? 'input-error' : '';
    const hideSuccessMessage = contactMessageSuccess ? 'hide-contact-me-message-success' : '';

    return (
      <section id="contact-me-send-message">
        <div id="contact-me-send-message-title">
          <i className="fas fa-envelope"></i>
          <h2>{sendMessage.title}</h2>
        </div>
        <div id="contact-me-send-message-body">
          <form id="contact-me-send-message-form">
            <div id="contact-me-notice">
              <p>{sendMessage.notice}</p>
            </div>
            <div className="contact-me-send-message-input-group">
              <label htmlFor="contact-me-name">
                <i className="fas fa-user"></i>
                {sendMessage.inputGroup.inputName.labelText}
              </label>
              <input type="text" id="contact-me-name" name="contactMeName" maxLength="60" className={contactMeNameBorderError} placeholder={sendMessage.inputGroup.inputName.inputPlaceholder} value={this.state.contactMeName} onChange={this.handleInput}/>
              {contactMeNameError && <p className="input-msg-error">{sendMessage.inputGroup.inputName.inputMsgError}</p>}
            </div>
            <div className="contact-me-send-message-input-group">
              <label htmlFor="contact-me-email">
                <i className="fas fa-at"></i>
                {sendMessage.inputGroup.inputEmail.labelText}
              </label>
              <input type="email" id="contact-me-email" name="contactMeEmail" maxLength="80" className={contactMeEmailBorderError} placeholder={sendMessage.inputGroup.inputEmail.inputPlaceholder} value={this.state.contactMeEmail} onChange={this.handleInput}/>
              {contactMeEmailError && <p className="input-msg-error">{sendMessage.inputGroup.inputEmail.inputMsgError}</p>}
            </div>
            <div className="contact-me-send-message-input-group">
              <label htmlFor="contact-me-subject">
                <i className="fas fa-pen-alt"></i>
                {sendMessage.inputGroup.inputSubject.labelText}
              </label>
              <input type="text" id="contact-me-subject" name="contactMeSubject" maxLength="70" className={contactMeSubjectBorderError} placeholder={sendMessage.inputGroup.inputSubject.inputPlaceholder} value={this.state.contactMeSubject} onChange={this.handleInput}/>
              {contactMeSubjectError && <p className="input-msg-error">{sendMessage.inputGroup.inputSubject.inputMsgError}</p>}
            </div>
            <div className="contact-me-send-message-input-group">
              <label htmlFor="contact-me-message">
                <i className="fas fa-comment"></i>
                {sendMessage.inputGroup.textareaMessage.labelText}
              </label>
              <textarea id="contact-me-message" name="contactMeMessage" maxLength="500" className={contactMeMessageBorderError} placeholder={sendMessage.inputGroup.textareaMessage.textareaPlaceholder} value={this.state.contactMeMessage} onChange={this.handleInput}></textarea>
              {contactMeMessageError && <p className="input-msg-error">{sendMessage.inputGroup.textareaMessage.textareaMsgError}</p>}
            </div>
            <div id="contact-me-send-message-button">
              <button type="submit" onClick={this.handleSubmit}>
                <i className="far fa-envelope"></i>
                {sendMessage.sendButtonText}
              </button>
            </div>
            <div id="contact-me-loading-send-message">
              <img src="/images/ajax-loader.gif" alt="Loading gif"/>
            </div>
            {contactMessageSuccess && <div id="contact-me-success-message" className={hideSuccessMessage}>
              <p>{sendMessage.successMessage}</p>
            </div>}
          </form>
        </div>
      </section>
    );
  }
}

const ContactMePage = (props) => {
  const {languageData, currentLanguage} = props;

  return (
    <article id="contact-me-page-body">
      <SocialMedia currentLanguage={currentLanguage} languageData={languageData}/>
      <SendMessage currentLanguage={currentLanguage} languageData={languageData}/>
    </article>
  );
}

export default ContactMePage;