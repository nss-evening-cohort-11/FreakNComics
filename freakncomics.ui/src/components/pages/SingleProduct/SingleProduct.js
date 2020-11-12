import React from 'react';
// import _ from 'lodash';

import ProductData from '../../../helpers/data/ProductData';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  state = {
    product: {},
  }

  getProduct = () => {
    // todo: grab id from URL using the below (after routing from button click)
    const { productId } = this.props.match.params;
    ProductData.getSingleProduct(productId)
      .then((resp) => this.setState({ product: resp }))
      .catch((err) => console.error('could not get single product: ', err));
  }

  componentDidMount() {
    this.getProduct();
  }

  addToShoppingCart = () => {
    const { product } = this.state;
    // todo: get the userId from auth
    // in the meantime, we'll use this hardcoded userId
    const userId = 3;
    PurchaseOrderData.addToCart(userId, product)
      .then((resp) => window.alert(`${product.title} successfully added to your cart`)) //eslint-disable-line
      .catch((err) => console.error('could not get orders for user'));
  }

  render() {
    const { product } = this.state;
    return (
      <div className="SingleProduct d-flex flex-wrap justify-content-around mt-5">
        <div className="row">
          <div className="SingleProduct-image col-8">
            <img alt={product.title} src={product.imageUrl} />
          </div>
          <div className="SingleProduct-details col-4">
            <h2>{product.title} </h2>
            <h3>${product.price}</h3>
            <p>Availability: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
            {
              product.inStock
                ? <p>Quantity: {product.quantity}</p>
                : ''
            }
            <p>Product Description: {product.description}</p>
            {
              product.inStock
                ? <button className="btn btn-outline-primary" onClick={this.addToShoppingCart}><i className="fas fa-shopping-cart"></i> Add to cart</button>
                : <button className="btn btn-outline-primary" disabled><i className="fas fa-shopping-cart"></i> Add to cart</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
