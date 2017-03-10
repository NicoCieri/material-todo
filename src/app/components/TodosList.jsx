import React from 'react';
import {render} from 'react-dom';
import TodoItem from './TodoItem.jsx';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';




class TodosList extends React.Component{

  render(){
    let list = '';
    return (
      <List>
        {this.props.todos.map((t)=>{
          return (
            <div>
              <TodoItem key={t.id} todo={t} />
            </div>
          )
        })}

      </List>
    );
  }
}

export default TodosList;
