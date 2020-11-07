import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import ProductCard from '../../shared/ProductCard/ProductCard';

class Home extends React.Component {
  static props = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products } = this.props;

    const buildLatestProductList = products.map((product) => (
      <ProductCard key={`product${product.productId}`} product={product} />
    ));
    return (
      <div className="Home">
        <h3> Latest Available Products </h3>
        <div className="LatestProducts d-flex flex-wrap justify-content-around">
          {buildLatestProductList}
        </div>
      </div>
    );
  }
}

export default Home;
