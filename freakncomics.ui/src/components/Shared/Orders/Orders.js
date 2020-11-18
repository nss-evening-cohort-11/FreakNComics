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
      <div className="Orders orders-container col-6 offset-3">
        <div className="row orders-container_content">
          <p className="col">{moment(order.invoiceDate).format('LL')}</p>
          <p className="col">Total: ${order.total}</p>
          <Link className="col-1 btn btn-outline-dark" order={order} to={`/order/${order.purchaseOrderId}`}><i className="fas fa-search"></i></Link>
        </div>
      </div>
    );
  }
}

export default Orders;
