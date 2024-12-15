import React from 'react';
import './MyNavbar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter, NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import props from '../../../helpers/propz/ValueShape';
import ProductCategoriesCollapse from '../ProductCategoriesCollapse/ProductCategoriesCollapse';

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
      this.props.history.push('/');
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
      <NavLink className="navbar-brand" tag={RRNavLink} to="/">Freak 'N Comics</NavLink>

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
          {/* TODO: add ternary operated that displays login navlink if user is unauthed and account navlink if user is authed */}
          <li className="nav-item">
            <NavLink tag={RRNavLink} to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink tag={RRNavLink} to="/user-profile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink tag={RRNavLink} to="/shopping-cart">Cart</NavLink>
          </li>
          <li className="nav-item">
            <NavLink tag={RRNavLink} to="/register">Register</NavLink>
          </li>
          <li className="nav-item">
            <ProductCategoriesCollapse/>
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
