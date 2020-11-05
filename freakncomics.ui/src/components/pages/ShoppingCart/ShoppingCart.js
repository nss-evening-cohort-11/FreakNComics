import React from 'react';
import PurcahseOrderData from '../../../helpers/data/PurcahseOrderData';
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
    PurcahseOrderData.getCompletePurchaseOrder(userId)
      .then((resp) => {
        console.error(resp);
        this.setState({ activeOrder: resp });
        console.error(resp.purchaseOrderId);
        PurcahseOrderData.getLineItemsByPurchaseOrderId(resp.purchaseOrderId)
          .then((response) => {
            console.error(response);
            this.setState({ lineItems: [response] });
          });
      })
      .catch((err) => console.error(err));
  };

  GetProductIdFromLineItem = () => {
    const purchaseOrderId = 3;
    PurcahseOrderData.getLineItemsByPurchaseOrderId(purchaseOrderId)
      .then((response) => {
        const LineItems = response.data;
        const ArrayofLineItems = [];
        ArrayofLineItems.push(LineItems.productId);
        console.error(ArrayofLineItems);
      });
  };

  componentDidMount() {
    this.GetShoppingCartOrderandItems();
    this.GetProductIdFromLineItem();
  }

  render() {
    // const { lineItems, products } = this.state;

    // const buildProductCardFromLineItem = lineItems.map((lineItem) => (
    //   <ProductCard key={lineItem.LineItemId} lineItem={lineItem} />
    // ));
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
