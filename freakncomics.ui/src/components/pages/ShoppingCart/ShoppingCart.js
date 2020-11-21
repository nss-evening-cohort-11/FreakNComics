import React from 'react';
import { Link } from 'react-router-dom';
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
      PurchaseOrderData.getLineItemsWithProducts(resp.purchaseOrderId)
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
      <div className="lineItems flex-column align-items-center d-flex flex-wrap container mt-5">
        <h2 className="shopping-cart d-flex flex-wrap justify-content-around mt-5 mb-3">
          Your Cart:
        </h2>
      <div className="flex-column col-6"> {buildLineItems} </div>
      <Link className="col-1 continue-shopping-btn btn btn-dark align-items-center mt-3" to={'/'}> Continue Shopping</Link>
        <h4 className="d-flex flex-wrap justify-content-around mt-5 mb-3">
          Subtotal:
        $ {activeOrder.total}
        </h4>
        <h4 className="d-flex flex-wrap justify-content-around mt-5 mb-3">
          Tax: {(activeOrder.total * 0.0925).toFixed(2, 2)}
        </h4>
        <h3 className="d-flex flex-wrap justify-content-around mt-5 mb-3">
        Your Total:
        $ {((activeOrder.total * 0.0925) + (activeOrder.total)).toFixed(2, 2)}
        </h3>
      </div>
  );
}
}

export default ShoppingCart;
