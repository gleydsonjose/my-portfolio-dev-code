import {useReducer} from 'react';

interface reducerSliderState {
  currentNumProject: number;
}

interface reducerSliderAction {
  button: string;
}

function useSlider(projectsLength: number) {
  function reducerSlider(state: reducerSliderState, action: reducerSliderAction) {
    switch(action.button) {
      case 'next':
        if(state.currentNumProject < projectsLength-1) {
          return {currentNumProject: state.currentNumProject + 1};
        } else {
          return {currentNumProject: state.currentNumProject};
        }
      case 'back':
        if(state.currentNumProject > 0) {
          return {currentNumProject: state.currentNumProject - 1};
        } else {
          return {currentNumProject: state.currentNumProject};
        }
      default:
        throw new Error("This type don't exist!");
    }
  }

  const initialState: reducerSliderState = {currentNumProject: 0};
  return useReducer(reducerSlider, initialState);
}

export default useSlider;