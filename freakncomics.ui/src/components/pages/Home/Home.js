import React from 'react';
import ProductCategoriesCollapse from '../../Shared/ProductCategoriesCollapse/ProductCategoriesCollapse';
import './Home.scss';
import ProductData from '../../../helpers/data/ProductData';
import ProductCard from '../../Shared/ProductCard/ProductCard';

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    ProductData.getAllProducts()
      .then((products) => { this.setState({ products }); })
      .catch((err) => console.error('cannot get products', err));
  }

  render() {
    const { products } = this.state;

    const buildLatestProductList = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
    return (
      <div className="Home">
        <p> Hello Home Component </p>
        <ProductCategoriesCollapse/>
        <h3> Latest Available Products </h3>
        <div className="LatestProducts d-flex flex-wrap justify-content-around">
          {buildLatestProductList}
        </div>
      </div>
    );
  }
}

export default Home;
