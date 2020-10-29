import React from 'react';
import './Home.scss';
import ProductData from '../../../helpers/data/ProductData';

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    ProductData.getAllProducts()
      .then((products) => { this.setState({ products }); })
      .catch((err) => console.error(err, 'could not get products'));
  }

  render() {
    return (
      <div className="Home">
        hey home component
      </div>
    );
  }
}

export default Home;
