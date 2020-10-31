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
      <div key={type.productTypeId} className="p-2 m-2 category d-flex col-3 flex-column">
        <h2>{type.category} ({GetTotal(type.productTypeId)})</h2>
        <div className="category-products">
          {products.map((product) => {
            if (type.productTypeId === product.productTypeId) {
              return (
                <div key={product.productId} className="product">
                  <p href="#">{product.title}</p> {/* Replace this line with a Link */}
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
        <button className="btn btn-primary m-2" onClick={this.toggle}>Product Categories</button>
        <Collapse isOpen={isOpen}>
          <Card className="col MyCard">
            <CardBody className="d-flex flex-wrap justify-content-around MyCard">
              {buildCategories}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default ProductCategoriesCollapse;
