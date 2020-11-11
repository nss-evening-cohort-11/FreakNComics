import React from 'react';
import './MyNavbar.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import props from '../../../helpers/propz/ValueShape';
import ProductCategoriesCollapse from '../ProductCategoriesCollapse/ProductCategoriesCollapse';

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
    authed: PropTypes.bool.isRequired,
  }

  changingField = (e) => {
    this.props.handleChange(e);
  }

  enterResponse = (e) => {
    if (this.props.location.pathname !== '') {
      this.props.history.push('/');
    }
    this.props.handleSubmit(e);
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  redirectHome = () => {
    this.props.history();
  }

  render() {
    const { authed } = this.props;

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
          <li className="nav-item">
            <ProductCategoriesCollapse/>
          </li>
          <li className="nav-item">
            {
              authed
                ? <button className="btn btn-danger" onClick={this.logMeOut}>Logout</button>
                : <button className="btn btn-primary" onClick={this.loginClickEvent}>Login</button>
            }
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
