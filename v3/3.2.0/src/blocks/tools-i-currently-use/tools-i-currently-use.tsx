import React, {FC, useContext} from 'react';
import './tools-i-currently-use.css';
import {stateIndexGroupContext} from '../../index';

interface ToolsICurrentlyUseTools {
  id: number,
  imgSrc: string,
  imgAlt: string,
  title: string
}

interface ToolsICurrentlyUseProps {
  toolsICurrentlyUseData: {
    title: string,
    tools: [ToolsICurrentlyUseTools],
    map?<U>(
      callbackfn: (
        value: ToolsICurrentlyUseTools,
        index: number,
        array: ToolsICurrentlyUseTools[]
      ) => U,
      thisArg?: any
    ): U[];
  }
}

const ToolsICurrentlyUse: FC<ToolsICurrentlyUseProps> = ({
  toolsICurrentlyUseData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const titleClass = `tools-i-currently-use__title${nightModeStatus ?
    ' tools-i-currently-use__title_night_mode' : ''}`;

  return (
    <section className="tools-i-currently-use">
      <h1 className={titleClass}>
        <i className="fas fa-tools tools-i-currently-use__title-icon"></i>
        {toolsICurrentlyUseData.title}
      </h1>
      <div className="tools-i-currently-use__tools-group">
        {toolsICurrentlyUseData.tools.map(item =>
          <img src={item.imgSrc} alt={item.imgAlt}
            className="tools-i-currently-use__tools-item"
            title={item.title} key={item.id}/>)}
      </div>
    </section>
  );
}

export default ToolsICurrentlyUse;