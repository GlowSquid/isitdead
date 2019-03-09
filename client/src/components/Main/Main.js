import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curlOutput: '',
      curlThis: '',
      output: '',
      cn: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.fetchCurl();
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.timer);
  // }

  fetchCurl = curlThis => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ curlThis })
    };

    fetch('http://localhost:5002/curl', options)
      .then(res => res.json())
      .then(json => {
        this.setState({ cn: 'output__test', curlOutput: json.output });
      })
      .catch(err => console.log('Error: ', err));

    // if (json.output === "22") {
    //   this.setState({
    //     cn: "output__error",
    //     curlOutput: "Yup, it's dead. Error: 502 Bad Gateway"
    //   });
    // } else if (json.output === "1)") {
    //   this.setState({
    //     cn: "output__error",
    //     curlOutput: "This is not a valid URL"
    //   });
    // } else if (json.output === "6)") {
    //   this.setState({
    //     cn: "output__error",
    //     curlOutput: "Yup, it's dead. Error: Could not resolve host"
    //   });
    // } else if (json.output === "7)") {
    //   this.setState({
    //     cn: "output__error",
    //     curlOutput: "Failed to connect. Are you even online?"
    //   });
    // } else {
    //   this.setState({ cn: "output__success", curlOutput: json.output });
    // }
  };

  onChange(e) {
    this.setState({ curlThis: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      cn: 'output__loading',
      curlOutput: 'Checking ' + this.state.curlThis
    });
    console.log('curlOutput:', this.state.curlThis);
    // const curlThis = this.state.curlThis;
    this.fetchCurl(this.state.curlThis);
  }

  render() {
    return (
      <div className="container">
        <div className="head">
          <h1>Is it dead..?</h1>
        </div>
        <form onSubmit={this.onSubmit} className="search-form">
          <input
            className="input"
            placeholder=" https://www.yoursite.com/"
            type="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button className="submit" id="btn">
            Check
          </button>
        </form>

        <h3 className={this.state.cn}>{this.state.curlOutput}</h3>
        <label>
          Check to see whether a website is working by pasting its URL!
        </label>
      </div>
    );
  }
}

export default Main;
