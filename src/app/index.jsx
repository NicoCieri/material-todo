import React from 'react';
import {render} from 'react-dom';
// Store
import todos from './reducers/todos.jsx'
import { createStore } from 'redux';
import todoStore from './reducers/todoStore.jsx';
// Components
import Clock from './components/Clock.jsx';
import Title from './components/Title.jsx';
import FormTodo from './components/FormTodo.jsx';
import TodosList from './components/TodosList.jsx';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';




// let todoStore = createStore(todos);

todoStore.subscribe((state)=>{
  console.log('------------------------------------------------');
  todoStore.getState()
  .forEach(e=> console.log(e));
});


class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="TO DO App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="container">
            <FormTodo />
            <TodosList todos={todoStore.getState()} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const appRender = ()=>render(<App />,
document.getElementById('app')
);

appRender();

todoStore.subscribe(()=> appRender())
