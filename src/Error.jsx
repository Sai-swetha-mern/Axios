import React, { Component } from 'react';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo)
   {
    this.setState({ hasError: true });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Please try again later.</p>;
    }

    return this.props.children;
  }
}

export default Error;