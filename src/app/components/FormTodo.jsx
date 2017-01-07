import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import todoStore from './../reducers/todoStore.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class FormTodo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
        this.state = {
          title: ''
        };
    }

    changeField(evt){
      let own = {};
      own[evt.target.id] = evt.target.value;
      // Redibuja el input cada vez que escribe el input
      this.setState(own);
    }

    handleSubmit(evt){
      evt.preventDefault();
      // Si está vacio
      if(this.state.title.trim()==='') return;
      // Si no está vacio
      // Agrega el nuevo todo con el dispatcher
      todoStore.dispatch({type: 'ADD_TODO', title: this.state.title});
      // Vacia el input
      this.setState({title:''});
    }

    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <TextField
            id='title' 
            value={this.state.title} 
            onChange={this.changeField} 
            autoComplete="false"
            floatingLabelText="Title"
          />
          <RaisedButton onClick={this.completeItem} label="Add" type="submit"></RaisedButton>
        </form>
      )
    }
}

export default FormTodo; 