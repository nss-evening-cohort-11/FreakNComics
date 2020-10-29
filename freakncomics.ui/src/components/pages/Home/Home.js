import React from 'react';
import ProductCategoriesCollapse from '../../Shared/ProductCategoriesCollapse/ProductCategoriesCollapse';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <p> Hello Home Component </p>
        <ProductCategoriesCollapse/>
      </div>
    );
  }
}

export default Home;
