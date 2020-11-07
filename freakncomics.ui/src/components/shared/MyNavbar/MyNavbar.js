import React from 'react';
import './MyNavbar.scss';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import props from '../../../helpers/propz/ValueShape';

// pass through the items i've searched into home.js

class MyNavbar extends React.Component {
  state = {
    products: [],
    inputValue: '',
    value: props,
  }

  static props = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    searchRedirect: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
  }

  changingField = (e) => {
    this.props.handleChange(e);
  }

  enterResponse = (e) => {
    if (this.props.location.pathname !== '') {
      this.props.history.push('/home');
    }
    this.props.handleSubmit(e);
  }

  redirectHome = () => {
    this.props.history();
  }

  // searchRedirect = (e) => {
  //   e.preventDefault();
  //   console.log(this.props.match);
  // }

  render() {
    // const { history } = this.props.match.params;
    // console.log(history);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Freak 'N Comics</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse d-flex justify-content-between navbarContent" id="navbarContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <h4><a href="/">Home</a></h4>
          </li>
          <li className="nav-item">
            <h4><a href="#">Account</a></h4>
          </li>
          <li className="nav-item">
            <h4><a href="#">Cart</a></h4>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        id="userInput"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={ this.state.value.inputValue}
        onChange={this.changingField}
        >
      </input>
      <button id="submitButton" onClick={this.enterResponse} >search</button>
      </form>
      </div>
    </nav>
    );
  }
}

export default withRouter(MyNavbar);
