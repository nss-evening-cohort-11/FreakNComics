import { forEach } from 'lodash';
import React from 'react';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './SingleOrderDetail.scss';

class SingleOrderDetail extends React.Component {
  state = {
    order: [],
    lineItems: [{}],
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
      .then((response) => this.setState({ lineItems: response }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOrderByOrderId();
    this.getLineItems();
  }

  render() {
    const { order, lineItems } = this.state;
    console.error(order, lineItems);
    const buildSingleItem = lineItems.map((lineItem) => (<h3 className="Product Title text center"> {lineItem.title} </h3>));
    return (
      <div className="OrderDetail col-6 offset-6">
           Order Detail page
        <div className="row">
          <div className="SingleOrder-details">
          {buildSingleItem}
          <p> {order.total} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleOrderDetail;
