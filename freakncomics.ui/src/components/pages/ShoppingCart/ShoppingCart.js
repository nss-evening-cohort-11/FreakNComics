import React from 'react';
import ProductData from '../../../helpers/data/ProductData';
import PurchaseOrderData from '../../../helpers/data/PurchaseOrderData';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
    state = {
      activeOrder: {},
      lineItems: [],
      products: [],
      authed: true,
      isComplete: false,
    }

GetShoppingCartOrderandItems = () => {
  const userId = 3;

  PurchaseOrderData.getCompletePurchaseOrder(userId)
    .then((resp) => {
      console.error(resp);
      this.setState({ activeOrder: resp });
      console.error(resp.purchaseOrderId);
      PurchaseOrderData.getLineItemsByPurchaseOrderId(resp.purchaseOrderId)
        .then((response) => {
          console.error(response);
          this.setState({ lineItems: response }, () => { this.GetProductByLineItem(); });
          console.error(this.state);
        })
        .catch((err) => console.error(err));
    });
};

GetProductByLineItem = () => {
  const { lineItems } = this.state;
  lineItems.forEach((singleLineItem) => {
    ProductData.getSingleProduct(singleLineItem.product)
      .then((product) => {
        const finalProducts = [];
        product.forEach((lineItemProduct) => {
          const productCopy = { ...lineItemProduct };
          productCopy.lineItemProduct = lineItemProduct.find((x) => x.productId === singleLineItem.productId);
          finalProducts.push(productCopy);
        });
      })
      .catch((err) => console.error(err));
  });
}

componentDidMount() {
  this.GetShoppingCartOrderandItems();
}

render() {
  return (
      <div className="lineItems container mt-5">
      <div className="row">
        <div className="lineItems-details col-4">
        </div>
      </div>
    </div>
  );
}
}

export default ShoppingCart;
