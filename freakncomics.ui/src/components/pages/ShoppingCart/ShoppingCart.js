import React from 'react';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './ShoppingCart.scss';
import SingleLineItem from '../../SingleLineItem/SingleLineItem';

class ShoppingCart extends React.Component {
    state = {
      activeOrder: {},
      authed: true,
      isComplete: false,
      lineItems: [],
    }

GetShoppingCartOrderandItems = () => {
  const userId = 3;

  PurchaseOrderData.getCompletePurchaseOrder(userId)
    .then((resp) => {
      this.setState({ activeOrder: resp });
      PurchaseOrderData.getLineItemsByPurchaseOrderId(resp.purchaseOrderId)
        .then((response) => {
          this.setState({ lineItems: response });
        });
    })
    .catch((err) => console.error(err));
};

componentDidMount() {
  this.GetShoppingCartOrderandItems();
}

removeLineItemFromCart = (id, itemId) => {
  PurchaseOrderData.removeLineItem(id, itemId)
    .then(() => this.GetShoppingCartOrderandItems())
    .catch((error) => console.error(error));
}

render() {
  const { lineItems, activeOrder } = this.state;
  const buildLineItems = lineItems.map((lineItem, index) => (
    <SingleLineItem key={index} lineItem={lineItem} activeOrder={activeOrder} removeLineItem={this.removeLineItemFromCart} />
  ));

  return (
      <div className="lineItems container mt-5">
        <h2 className="shopping-cart d-flex flex-wrap justify-content-around mt-5 mb-3">
          Your Cart:
        </h2>
      {buildLineItems}
        <h3 className="d-flex flex-wrap justify-content-around mt-5 mb-3">
          Your Total:
        $ {activeOrder.total}
        </h3>
      </div>
  );
}
}

export default ShoppingCart;
