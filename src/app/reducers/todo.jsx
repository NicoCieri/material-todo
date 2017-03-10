import { createStore } from 'redux';
import { v4 } from 'node-uuid';


function todo(state={}, action){
  switch (action.type) {
    case 'ADD_TODO':
      return {
        title: action.title,
        init: false,
        timer: 0,
        timer_formated: '0'.toString().toHHMMSS(),
        pause: true,
        complete: false,
        id: v4()
      }
    break;

    case 'TOGGLE_TODO':
      // console.log(state.id, action.id);
      if(state.id !== action.id) return state;
      else return Object.assign({},
          state,
          {finish: !state.finish}
        );
    break;

    case 'REMOVE_TODO':
      return !(state.id === action.id);
    break;

    case 'INIT_TODO':
      // console.log(action);
      if(state.id !== action.id) return state;
      else return Object.assign({},
          state,
          {init: true, timer: 0, pause: false});
    break;

    case 'TOGGLE_PAUSE_TODO':
      // console.log(action);
      if(state.id !== action.id) return state;
      else return Object.assign({},
          state,
          {pause: !state.pause});
    break;

    case 'COMPLETE_TODO':
      console.log('state', state);
      console.log('action',action);
      if(state.id !== action.id) return state;
      else return Object.assign({},
          state,
          {complete: true, timer: action.timer, timer_formated: action.timer.toString().toHHMMSS(),});
    break;

    default:
      return false;
  }
}

export default todo;
