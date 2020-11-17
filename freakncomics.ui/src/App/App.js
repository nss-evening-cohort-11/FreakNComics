import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import ProductData from '../helpers/data/ProductData';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import UserProfile from '../components/pages/UserProfile/UserProfile';

class App extends React.Component {
  state = {
    products: [],
    inputValue: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    ProductData.getProductByUserInput(inputValue)
      .then((response) => {
        this.setState({ products: response });
      })
      .catch((err) => (err));
  }

  componentDidMount() {
    ProductData.getLatestProducts()
      .then((products) => { this.setState({ products }); })
      .catch((err) => console.error('cannot get products', err));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <MyNavbar handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            <Switch>
              <Route path='/products/:productId' component={ SingleProduct }/>
              <Route path='/user-profile' component={UserProfile}/>
              <Route path='/shopping-cart' component={ShoppingCart}/>
              <Route path='/' component={() => <Home products={this.state.products}/> } />
              <Redirect from="*" to="/" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
