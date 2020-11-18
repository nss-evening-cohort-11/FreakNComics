import React from 'react';
import { Link } from 'react-router-dom';
import OrderShape from '../../../helpers/propz/OrderShape';
import './Orders.scss';

class Orders extends React.Component {
  static propTypes = {
    lineItem: OrderShape.OrderShape,
  }

  render() {
    const { order } = this.props;
    return (
      <div className="Orders container pb-3 mb-3">
        <div className="row">
          <p className="col">{order.invoiceDate}</p>
          <p className="col">{order.total}</p>
          <Link className="col-1 btn btn-outline-dark" to={`/order/${order.purchaseOrderId}`}><i className="fas fa-search"></i></Link>
        </div>
      </div>
    );
  }
}

export default Orders;
