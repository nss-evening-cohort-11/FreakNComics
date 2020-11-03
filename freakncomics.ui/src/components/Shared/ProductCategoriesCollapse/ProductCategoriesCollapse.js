import React from 'react';
import {
  Collapse,
  CardBody,
  Card,
} from 'reactstrap';

import ProductData from '../../../helpers/data/ProductData';
import ProductTypeData from '../../../helpers/data/ProductTypeData';

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

    const GetTotal = (typeId) => products.filter((product) => product.productTypeId === typeId).length;

    const buildCategories = productTypes.map((type) => (
      <div key={type.productTypeId} className="p-2 m-2 category d-flex flex col-3 flex-column justify-content-center align-self-start">
        <h2 className="mx-auto">{type.category} ({GetTotal(type.productTypeId)})</h2>
        <div className="category-products">
          {products.filter((prod) => prod.productTypeId === type.productTypeId).slice(0, 3).map((product) => (
                <div key={product.productId} className="product d-flex justify-content-center">
                  <p href="#">{product.title}</p> {/* Replace this line with a Link */}
                </div>
          ))}
        </div>
      </div>
    ));

    return (
      <div className="ProductCategoriesCollapse d-flex justify-content-center flex-column">
        <button className="btn btn-primary mx-auto mb-2" onClick={this.toggle}>Product Categories</button>
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
