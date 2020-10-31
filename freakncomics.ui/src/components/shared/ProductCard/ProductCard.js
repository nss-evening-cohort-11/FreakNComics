/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
// import { Link } from 'react-dom';
import ProductShape from '../../../helpers/propz/ProductShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: ProductShape.ProductShape,
  }

  render() {
    const { product } = this.props;

    return (
      // <div className="ProductCard">
      <div className="ProductCard card d-flex flex-wrap">
        <div className="card-body justify-content-around">
          <h3 className="card-title">{product.title}</h3>
          <img className="card-img" alt="This is an image of the product" src={product.imageUrl} />
          {/* <Link className="view-single-product-button btn btn dark" to={singleProductLink}> Product Details  <i className="fas fa-eye"></i> </Link>  */}
        </div>
     </div>
    // </div>
    );
  }
}
export default ProductCard;
