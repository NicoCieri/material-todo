import {createStore} from 'redux';
import todos from './todos.jsx'

let todoStore = createStore(todos);

export default todoStore;
