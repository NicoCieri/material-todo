import { createStore } from 'redux';

let id = 0;

function todo(state={}, action){
  switch (action.type) {
    case 'ADD_TODO':
      return {
        title: action.title,
        init: false,
        timer: 0,
        timer_formated: '0'.toString().toHHMMSS(),
        complete: false,
        id: id++
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
          {init: true, timer: 0});
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