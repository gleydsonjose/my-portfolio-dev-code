import React, {FC} from 'react';
import './alert.css';

interface AlertProps {
  alertData: {
    text: string;
    linkText: string;
  }
}

const Alert: FC<AlertProps> = ({
  alertData
}) => {
  return (
    <div className="alert">
      <p className="alert__text">{alertData.text} <a href="https://github.com/satuctkode?tab=repositories" className="alert__link" target="_blank" rel="noopener noreferrer">{alertData.linkText}</a></p>
    </div>
  );
}

export default Alert;