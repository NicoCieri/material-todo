import React from 'react';
import {render} from 'react-dom';
import TodoItem from './TodoItem.jsx';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';




class TodosList extends React.Component{

  render(){
    console.log('this.props.todos', this.props.todos)
    return (
      <List>
        {this.props.todos.map((t)=> <TodoItem key={t.id} todo={t} /> )}
      </List>
    );
  }
}

export default TodosList;
