import React from 'react';
import {render} from 'react-dom';
import Title from './Title.jsx';

export default class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        currentTime: new Date().getSeconds()
      }
    }

    render(){
      return (
        <h2>{this.state.currentTime}</h2>
      )
    }

    componentDidMount(){
      this.intervalId = setInterval(()=> this.setState({currentTime: new Date().getSeconds()}), 1000);
    }
}