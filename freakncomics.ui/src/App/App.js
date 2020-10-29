import React from 'react';
import './App.scss';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Home from '../components/pages/Home/Home';

class App extends React.Component {
  render() {
    return (
      <div className="App">
       <Home />
       <SingleProduct />
      </div>
    );
  }
}

export default App;
