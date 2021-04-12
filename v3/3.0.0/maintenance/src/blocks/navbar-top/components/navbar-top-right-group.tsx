import React, {FC} from 'react';

const NavbarTopRightGroup: FC = () => {
  return (
    <section className="navbar-top__right-group">
      <div className="navbar-top__social-media">
        <a href="https://www.facebook.com/gleydsonjosedasilva"
          className="navbar-top__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f navbar-top__social-media-icon"></i>
        </a>
        <a href="https://www.linkedin.com/in/gleydson-jose-8600a2189"
          className="navbar-top__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in navbar-top__social-media-icon"></i>
        </a>
        <a href="https://t.me/GleydsonJose"
          className="navbar-top__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-telegram-plane navbar-top__social-media-icon"></i>
        </a>
        <a href="https://api.whatsapp.com/send?1=pt_BR&phone=55081988101515"
          className="navbar-top__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp navbar-top__social-media-icon"></i>
        </a>
        <a href="https://twitter.com/gleydsongst"
          className="navbar-top__social-media-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter navbar-top__social-media-icon"></i>
        </a>
      </div>
    </section>
  );
}

export default NavbarTopRightGroup;