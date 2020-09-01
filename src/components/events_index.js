import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readEvents } from '../actions';

class EventsIndex extends Component {

  componentDidMount() {
    this.props.readEvents();
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div>value: {props.value}</div>
        <button onClick={props.increment}>+</button>
        <button onClick={props.decrement}>-</button>
      </React.Fragment>
    )
  }
}

// value: state.dummy.value とすると、dummy の value が表示される.
const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement())
// })
const mapDispatchToProps = ({ readEvents })
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)