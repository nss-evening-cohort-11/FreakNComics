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
    const { products } = this.state;

    const showProducts = products.map((product) => <p>{product.title}</p>);

    return (
      <div className="Home">
        {showProducts}
      </div>
    );
  }
}

export default Home;
