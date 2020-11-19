import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import OrderShape from '../../../helpers/propz/OrderShape';
import './Orders.scss';

class Orders extends React.Component {
  static propTypes = {
    lineItem: OrderShape.OrderShape,
  }

  render() {
    const { order } = this.props;
    return (
      <div className="Orders orders-container d-flex flex-row col-8">
          <p className="col-8"><strong>Order Placed:</strong> {moment(order.invoiceDate).format('LL')}</p>
          <p className="col-3"><strong>Total:</strong> ${order.total}</p>
          <Link className="col-1 view-order-btn" order={order} to={`/order/${order.purchaseOrderId}`}><i className="fas fa-search"></i></Link>
      </div>
    );
  }
}

export default Orders;
