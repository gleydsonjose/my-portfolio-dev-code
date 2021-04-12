import React, {FC} from 'react';
import './footer.css';

interface FooterProps {
  languageDataFooter: {
    title: string;
  }
}

const Footer: FC<FooterProps> = ({
  languageDataFooter
}) => {
  return (
    <footer className="footer">
      <h1 className="footer__title">{languageDataFooter.title}</h1>
      <div className="footer__social-media">
        <a href="https://www.facebook.com/gleydsonjosedasilva"
          className="footer__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f footer__social-media-icon"></i>
        </a>
        <a href="https://www.linkedin.com/in/gleydson-jose-8600a2189/"
          className="footer__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in footer__social-media-icon"></i>
        </a>
        <a href="https://t.me/GleydsonJose"
          className="footer__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-telegram-plane footer__social-media-icon"></i>
        </a>
        <a href="https://api.whatsapp.com/send?1=pt_BR&phone=55081988101515"
          className="footer__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp footer__social-media-icon"></i>
        </a>
        <a href="https://twitter.com/gleydsongst"
          className="footer__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter footer__social-media-icon"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;