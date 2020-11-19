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
      <div className="Orders orders-container d-flex flex-row col-6 offset-3">
          <p className="col">{moment(order.invoiceDate).format('LL')}</p>
          <p className="col">Total: ${order.total}</p>
          <Link className="col-1 view-order-btn" order={order} to={`/order/${order.purchaseOrderId}`}><i className="fas fa-search"></i></Link>
      </div>
    );
  }
}

export default Orders;
