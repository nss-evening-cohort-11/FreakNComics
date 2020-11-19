import React from 'react';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './SingleOrderDetail.scss';
import SingleOrderDetailCard from '../../shared/SingleOrderDetailCard/SingleOrderDetailCard';

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
    const { lineItems } = this.state;
    const buildSingleItem = lineItems.map((lineItem) => (
      <SingleOrderDetailCard key={lineItem.lineItemId} lineItem={lineItem} />
    ));
    return (
      <div className="OrderDetail col-12">
        <h2 className="text-center"> Order Detail </h2>
        <div className="align-item-center">
          <div className="SingleOrder-details text-center ">
          {buildSingleItem}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleOrderDetail;
