/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import ProductShape from '../../../helpers/propz/ProductShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: ProductShape.ProductShape,
  }

  render() {
    const { product } = this.props;
    const productLink = `products/${product.productId}`;

    return (
      <div className="ProductCard d-flex flex-wrap justify-content-center card co-12">
        <div className="card-body ">
          <h4 className="card-title">{product.title}</h4>
          <img className="card-img" alt="This is an image of the product" src={product.imageUrl} />
          <Link className="view-single-product-button btn btn-outline-dark" to={productLink}> Product Details  <i className="fas fa-eye"></i> </Link>
        </div>
     </div>
    );
  }
}
export default ProductCard;
