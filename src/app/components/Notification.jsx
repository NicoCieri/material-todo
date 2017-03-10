import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.closeNotification = this.closeNotification.bind(this)
    this.state = { open: false }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // Only re-render when snackbar is going from closed to open
  //   return !this.state.open && nextState.open;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sending) {
      this.setState({ open: true })
    } else {
      this.setState({ open: false })
    }
  }

  closeNotification() {
    this.setState({ open: false })
  }

  render() {
    console.log('render', this.state.open)
    return (
      <Snackbar
        open={this.state.open}
        message={'test'}
        autoHideDuration={4000}
        onRequestClose={this.closeNotification}
      />
    )
  }
}

export default Notification
