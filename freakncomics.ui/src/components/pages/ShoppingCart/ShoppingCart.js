import React from 'react';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    activeOrder: {},
  }

  render() {
    const { activeOrder } = this.state;
    return (
      <div className="activeOrder container mt-5">
      <div className="row">
        <div className="activeOrder-image col-8">
          <img alt={activeOrder.title} src={activeOrder.imageUrl} />
        </div>
        <div className="activeOrder-details col-4">
          <h2>{activeOrder.title} </h2>
          <h3>${activeOrder.price}</h3>
        </div>
      </div>
    </div>
    );
  }
}

export default ShoppingCart;
