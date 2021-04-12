import React, {FC, useContext} from 'react';
import './tools-i-have-used.css';
import {stateIndexGroupContext} from '../../index';

interface ToolsIHaveUsedTools {
  id: number,
  imgSrc: string,
  imgAlt: string,
  title: string
}

interface ToolsIHaveUsedProps {
  toolsIHaveUsedData: {
    title: string,
    tools: [ToolsIHaveUsedTools],
    map?<U>(
      callbackfn: (
        value: ToolsIHaveUsedTools,
        index: number,
        array: ToolsIHaveUsedTools[]
      ) => U,
      thisArg?: any
    ): U[];
  }
}

const ToolsIHaveUsed: FC<ToolsIHaveUsedProps> = ({
  toolsIHaveUsedData
}) => {
  const nightModeStatus = useContext(stateIndexGroupContext).nightModeStatus;
  const titleClass = `tools-i-have-used__title${nightModeStatus ?
    ' tools-i-have-used__title_night_mode' : ''}`;

  return (
    <section className="tools-i-have-used">
      <h1 className={titleClass}>
        <i className="fas fa-toolbox tools-i-have-used__title-icon"></i>
        {toolsIHaveUsedData.title}
      </h1>
      <div className="tools-i-have-used__tools-group">
        {toolsIHaveUsedData.tools.map(item =>
          <img src={item.imgSrc} alt={item.imgAlt}
            className="tools-i-have-used__tools-item"
            title={item.title} key={item.id}/>)}
      </div>
    </section>
  );
}

export default ToolsIHaveUsed;