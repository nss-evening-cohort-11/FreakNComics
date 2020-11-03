import React from 'react';
import './Home.scss';
import ProductData from '../../../helpers/data/ProductData';
import ProductCard from '../../shared/ProductCard/ProductCard';

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    ProductData.getLatestProducts()
      .then((products) => { this.setState({ products }); })
      .catch((err) => console.error('cannot get products', err));
  }

  render() {
    const { products } = this.state;

    const buildLatestProductList = products.map((product) => (
      <ProductCard key={`product${product.productId}`} product={product} />
    ));
    return (
      <>
      <h3> Latest Available Products </h3>
      <div className="LatestProducts d-flex flex-wrap justify-content-around">
       {buildLatestProductList}
      </div>
      </>
    );
  }
}

export default Home;
