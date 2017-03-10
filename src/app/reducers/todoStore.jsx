import {createStore} from 'redux'
import todos from './todos.jsx'
import {loadState} from '../localStorage'

const persistedState = loadState()
let todoStore = createStore(
  todos,
  persistedState
);

export default todoStore
