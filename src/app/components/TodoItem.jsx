import React from 'react';
import {render} from 'react-dom';
import todoStore from './../reducers/todoStore.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import StopIcon from 'material-ui/svg-icons/av/stop';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/navigation/check';


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

let toHHMMSS = function(seconds) {
  return seconds.toString().toHHMMSS()
}

class TodoItem extends React.Component{

  constructor(props){
      super(props);
      this.toggleItem = this.toggleItem.bind(this);
      this.togglePauseItem = this.togglePauseItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.initItem = this.initItem.bind(this);
      this.completeItem = this.completeItem.bind(this);
      this.increaseTimer = this.increaseTimer.bind(this);
      this.state = {
        timer: 0,
        timer_formated: toHHMMSS(0)
      }
  }

  toggleItem(){
    todoStore.dispatch({type:'TOGGLE_TODO', id: this.props.todo.id});
  }

  togglePauseItem(){
    todoStore.dispatch({type:'TOGGLE_PAUSE_TODO', id: this.props.todo.id});
    clearInterval(this.intervalTimer);
  }

  removeItem(){
    todoStore.dispatch({type:'REMOVE_TODO', id: this.props.todo.id});
    clearInterval(this.intervalTimer);
  }

  initItem(){
    todoStore.dispatch({type: 'INIT_TODO', id: this.props.todo.id});
    this.increaseTimer()
    this.intervalTimer = setInterval(()=> this.increaseTimer(), 1000);
  }

  increaseTimer() {
    this.setState({
      timer: this.state.timer + 1,
      timer_formated: this.state.timer.toString().toHHMMSS()
    })
  }

  completeItem(){
    todoStore.dispatch({type: 'COMPLETE_TODO', id: this.props.todo.id, timer: this.state.timer});
    clearInterval(this.intervalTimer);
  }


  render(){
    const itemStyle = {
      color: this.props.todo.complete === true ? '#13b913' : '#ff0000'
    };
    let playBtn
    let stopBtn


    if(this.props.todo.complete)
      playBtn = ''
    else if (this.props.todo.pause)
      playBtn = <IconButton onClick={this.initItem} label="Start"><PlayIcon /></IconButton>
    else
      playBtn = <IconButton onClick={this.togglePauseItem} label="Pause"><PauseIcon /></IconButton>

    if (!this.props.todo.init)
      stopBtn = ''
    else if (this.props.todo.complete)
      stopBtn = <IconButton label="Done"><CheckIcon /></IconButton>
    else
      stopBtn = <IconButton onClick={this.completeItem} label="Stop"><StopIcon /></IconButton>

    return (
      <div className="container" style={itemStyle }>
        <Card style={styles.fullWidth}>
          <CardHeader
            title={this.props.todo.title}
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
            style={styles.title}
          />

          <CardActions style={styles.right}>
            {playBtn}
            {stopBtn}
            <IconButton onClick={this.removeItem} label="Remove" >
              <DeleteIcon />
            </IconButton>
          </CardActions>

          <CardText expandable={false} style={styles.counter}>{this.state.timer_formated}</CardText>
        </Card>
      </div>
    );
  }
}

const styles = {
  fullWidth: {
    display: 'table',
    width: '100%'
  },
  right: {
    float: 'right'
  },
  left: {
    float: 'left'
  },
  title: {
    padding: '25px 16px',
    float: 'left'
  },
  counter: {
    padding: '25px 16px',
    float: 'right'
  }
}

export default TodoItem;
