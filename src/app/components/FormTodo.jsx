import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import todoStore from './../reducers/todoStore.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey50, red400, amber600} from 'material-ui/styles/colors';



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
        <div>
          <Card style={styles.card}>
            <CardText style={styles.form}>
              <form onSubmit={this.handleSubmit} autoComplete ="off">
                  <TextField
                    id='title'
                    value={this.state.title}
                    onChange={this.changeField}
                    autoComplete="off"
                    floatingLabelText="New task"
                    fullWidth
                    inputStyle={styles.input}
                    hintStyle={styles.errorStyle}
                    errorStyle={styles.errorStyle}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />

                  <FloatingActionButton
                    style={styles.floatButton}
                    icon={<PlayIcon />}
                    onClick={this.completeItem}
                    type="submit"
                    backgroundColor={amber600}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
              </form>
            </CardText>

          </Card>
        </div>
      )
    }
}

const styles = {
  card: {
    background: red400
  },
  form: {
    position: 'relative',
    'textAlign': 'right'
  },
  floatButton: {
    position: 'relative',
    marginTop: -30,
    top: 50
  },
  input: {
    color: grey50
  },
  errorStyle: {
    color: grey50,
  },
  underlineStyle: {
    borderColor: grey50,
  },
  floatingLabelStyle: {
    color: grey50,
  },
  floatingLabelFocusStyle: {
    color: grey50,
  }
}

export default FormTodo;
