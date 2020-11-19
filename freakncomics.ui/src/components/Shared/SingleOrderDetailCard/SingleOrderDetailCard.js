import React from 'react';
import { Link } from 'react-router-dom';
import './SingleOrderDetailCard.scss';
import LineItemWithProductShape from '../../../helpers/propz/LineItemWithProductShape';

class SingleOrderDetailCard extends React.Component {
  static propTypes = {
    lineItem: LineItemWithProductShape.LineItemWithProductShape,
  }

  render() {
    const { lineItem } = this.props;
    const singleProductLink = `/products/${lineItem.productId}`;

    return (
      <div className="SingleOrderDetailCard">
        <div className="card-header">
        <h3> {lineItem.title} </h3>
      </div>
      <div className="card-body">
        <p className="card-desc"> Description: {lineItem.description}</p>
        <p className="card-quantity"> Quantity: {lineItem.lineItemQuantity}</p>
        <p className="card-quantity"> Product Total: ${lineItem.lineItemQuantity * lineItem.unitPrice}</p>
        <Link className="btn btn-dark" to={singleProductLink}> View Product <i className="fas fa-search"> </i></Link>
      </div>
      </div>
    );
  }
}
export default SingleOrderDetailCard;
