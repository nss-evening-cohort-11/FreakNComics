import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Home from '../components/pages/Home/Home';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <Route path='/products/:productId' component={SingleProduct}/>
              <Route path='/' component={Home}/>
              <Redirect from="*" to="/" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>

       {/* <Home />
       <SingleProduct /> */}
      </div>
    );
  }
}

export default App;
