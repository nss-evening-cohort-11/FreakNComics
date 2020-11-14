import React from 'react';
import LineItemWithProductShape from '../../helpers/propz/LineItemWithProductShape';

class SingleLineItem extends React.Component {
    static propTypes = {
      lineItem: LineItemWithProductShape.LineItemWithProductShape,
    }

    removingLineItem = (e) => {
      e.preventDefault();
      const { lineItem, removeLineItem } = this.props;
      console.error(this.props);
      removeLineItem(lineItem.purchaseOrderId, lineItem.lineItemId);
    }

    render() {
      const { lineItem } = this.props;

      return (
      <div className="SingleLineItem container">
        <div className="row">
          <h5>
         Product:
          </h5>
          <div className="col">
          {lineItem.title}
          </div>
          <h5>
          Unit Price:
          </h5>
          <div className="col">
          {lineItem.unitPrice}
          </div>
         <h5>
         Quantity:
         </h5>
          <div className="col">
          {lineItem.lineItemQuantity}
          </div>
          <button className="remove-item-btn btn btn-danger mb-2" onClick={this.removingLineItem}> <i className="fas fa-trash"></i> </button>
        </div>
      </div>
      );
    }
}
export default SingleLineItem;
