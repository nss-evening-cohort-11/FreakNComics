import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import ProductData from '../helpers/data/ProductData';
import Register from '../components/pages/Register/Register';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import UserProfile from '../components/pages/UserProfile/UserProfile';
import Login from '../components/pages/Login/Login';
import SingleOrderDetail from '../components/pages/SingleOrderDetail/SingleOrderDetail';

import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
  state = {
    products: [],
    inputValue: '',
    authed: false,
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
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <MyNavbar handleSubmit={this.handleSubmit} handleChange={this.handleChange} authed={authed}/>
            <Switch>
              <Route path='/products/:productId' component={ SingleProduct }/>
              <Route path='/register' component={Register}/>
              <Route path='/order/:orderId' component={SingleOrderDetail}/>
              <Route path='/user-profile' component={UserProfile}/>
              <Route path='/shopping-cart' component={ShoppingCart}/>
              <Route path='/login' component={Login}/>
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
