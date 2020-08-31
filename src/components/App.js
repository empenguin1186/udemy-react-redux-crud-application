import React, { Component } from 'react';

const App = () => (<Counter></Counter>)

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log(this.state);
  }

  handlePlusButton = () => {
    this.setState({ count: this.state.count + 1 });
  }

  handleMinusButton = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <React.Fragment>
        <div>counter: {this.state.count}</div>
        <button onClick={this.handlePlusButton}>+</button>
        <button onClick={this.handleMinusButton}>-</button>
      </React.Fragment>
    )
  }
}

export default App;
