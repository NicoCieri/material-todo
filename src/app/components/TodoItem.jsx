import React from 'react';
import {render} from 'react-dom';
import todoStore from './../reducers/todoStore.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {ListItem} from 'material-ui/List';

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

class TodoItem extends React.Component{
  constructor(props){
      super(props);
      this.toggleItem = this.toggleItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.initItem = this.initItem.bind(this);
      this.completeItem = this.completeItem.bind(this);
      this.state = {
        timer: 0
      }
  }

  toggleItem(){
    todoStore.dispatch({type:'TOGGLE_TODO', id: this.props.todo.id});
  }

  removeItem(){
    todoStore.dispatch({type:'REMOVE_TODO', id: this.props.todo.id});
    clearInterval(this.intervalTimer);
  }

  initItem(){
    todoStore.dispatch({type: 'INIT_TODO', id: this.props.todo.id});
    this.intervalTimer = setInterval(()=> this.setState({timer: this.state.timer + 1,
        timer_formated: this.state.timer.toString().toHHMMSS()}), 1000);
  }

  completeItem(){
    todoStore.dispatch({type: 'COMPLETE_TODO', id: this.props.todo.id, timer: this.state.timer});
    clearInterval(this.intervalTimer);
  }


  render(){
    const itemStyle = {
      color: this.props.todo.complete === true ? '#13b913' : '#ff0000'
    };
    let btn = this.props.todo.init ? (<RaisedButton onClick={this.completeItem} label="Stop"></RaisedButton>) : (<RaisedButton onClick={this.initItem} label="Start"></RaisedButton>);
    if (this.props.todo.init && this.props.todo.complete) 
      btn = <RaisedButton onClick={this.initItem} label="Start" disabled={true}></RaisedButton>;

    return (
      <ListItem style={itemStyle } >
        {this.props.todo.title} | <span>{this.state.timer_formated}</span> | {btn} <RaisedButton onClick={this.removeItem} label="Remove" />
      </ListItem>
    );
  }
}

export default TodoItem;