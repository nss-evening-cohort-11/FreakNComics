import React from 'react';
import './MyNavbar.scss';
import ProductData from '../../../helpers/data/ProductData';

class MyNavbar extends React.Component {
  state = {
    products: [],
    inputValue: '',
  }

  // submitKeyPress(e) {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     ProductData.getProductByUserInput(this.inputValue);
  //   }
  // }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    if (e.key === 13) {
      ProductData.getProductByUserInput(this.state.inputValue)
        .then((response) => this.setState({ products: response }))
        .catch((err) => (err));
    }
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Freak 'N Comics</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
      <input className="form-control mr-sm-2" id="userInput" type="search" placeholder="Search" aria-label="Search" value={this.state.inputValue} onChange={(evt) => this.handleChange(evt)}></input>
      </form>
      </div>
    </nav>
    );
  }
}

export default MyNavbar;
