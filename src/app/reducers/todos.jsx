import { createStore } from 'redux';
import todo from './todo.jsx';

function todos(state=[], action){
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(null, action)];
    break;
    
    case 'TOGGLE_TODO':
      // console.log(' le action> ' , action);
      return state.map( t=> todo(t, action));
    break;

    case 'REMOVE_TODO':
      // return [state.slice(0, action.index).concat(index+1)];
      return state.filter(t=> todo(t, action));
    break;

    case 'INIT_TODO':
      return state.map( t=> todo(t, action));
    break;

    case 'COMPLETE_TODO':
      return state.map( t=> todo(t, action));
    break;

    default:
      return state;
  }
}

export default todos;