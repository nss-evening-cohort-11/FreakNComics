import React from 'react';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './SingleOrderDetail.scss';

class SingleOrderDetail extends React.Component {
  state = {
    order: [],
    lineItem: [],
  }

  getOrderByOrderId = () => {
    const { orderId } = this.props.match.params;
    PurchaseOrderData.getSingleOrderByOrderId(orderId)
      .then((resp) => this.setState({ order: resp }))
      .catch((err) => console.error(err));
  }

  getLineItems = () => {
    const { orderId } = this.props.match.params;
    PurchaseOrderData.getLineItemsWithProducts(orderId)
      .then((response) => this.setState({ lineItem: response }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOrderByOrderId();
    this.getLineItems();
  }

  render() {
    const { order, lineItem } = this.state;
    console.error(order, lineItem);
    return (
      <div className="OrderDetail col-6 offset-6">
           Order Detail page
        <div className="row">
          <div className="SingleOrder-details">
          <h2> {lineItem.title} </h2>
          <p> {order.title} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleOrderDetail;
