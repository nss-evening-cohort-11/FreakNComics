import React from 'react';
import {
  Collapse,
  CardBody,
  Card,
} from 'reactstrap';

import ProductData from '../../../helpers/data/ProductData';
import ProductTypeData from '../../../helpers/data/ProductTypeData';

import './ProductCategoriesCollapse.scss';

class ProductCategoriesCollapse extends React.Component {
  state = {
    isOpen: false,
    products: [],
    productTypes: [],
  }

  getInfo = () => {
    ProductData.getAllProducts()
      .then((response) => this.setState({ products: response }));
    ProductTypeData.getAllProductTypes()
      .then((response) => this.setState({ productTypes: response }))
      .catch((err) => console.error('could not get products', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen, products, productTypes } = this.state;

    const GetTotal = (typeId) => {
      const total = [];
      products.forEach((product) => {
        if (product.productTypeId === typeId) {
          total.push(product);
        }
      });
      return total.length;
    };

    const buildCategories = productTypes.map((type) => (
      <div key={type.productTypeId} className="card p-2 m-2 category">
        <h2>{type.category} ({GetTotal(type.productTypeId)})</h2>
        <div className="category-products">
          {products.map((product) => {
            if (type.productTypeId === product.productTypeId) {
              return (
                <div key={product.productId} className="product">
                  <p>{product.title}</p>
                </div>
              );
            }
            return ('');
          })}
        </div>
      </div>
    ));

    return (
      <div className="ProductCategoriesCollapse">
        <div>
          <button className="btn btn-primary m-2" onClick={this.toggle}>Product Categories</button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody className="d-flex flex-wrap justify-content-center">
                {buildCategories}
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default ProductCategoriesCollapse;
