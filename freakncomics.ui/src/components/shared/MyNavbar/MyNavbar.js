import React from 'react';
import './MyNavbar.scss';
import ProductData from '../../../helpers/data/ProductData';
import props from '../../../helpers/propz/ValueShape';

// pass through the items i've searched into home.js

class MyNavbar extends React.Component {
  state = {
    products: [],
    inputValue: '',
    value: props,
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    ProductData.getProductByUserInput(inputValue)
      .then((response) => this.setState({ products: response }))
      .catch((err) => (err));
  }

  // componentDidMount() {
  //   window.addEventListener('keypress', this.handleSubmit);
  //   window.addEventListener('keypress', this.handleChange);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keypress', this.handleSubmit);
  //   window.removeEventListener('keypress', this.handleChange);
  // }

  render() {
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
            <h4><a href="#">Home</a></h4>
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
        onChange={this.handleChange}
        >
      </input>
      <button onClick={this.handleSubmit} onKeyPress={this.handleSubmit}>search</button>
      </form>
      </div>
    </nav>
    );
  }
}

export default MyNavbar;
