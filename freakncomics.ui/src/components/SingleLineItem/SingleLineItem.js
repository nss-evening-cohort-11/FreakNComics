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
        // eslint-disable-next-line react/style-prop-object
        <div className="card border-dark mb-3">
        <div className="card-header"> <h3 className="text-center"><strong>Product: </strong> </h3>   <h5 className="text-center" >{lineItem.title}</h5> </div>
        <div className="card-body text-dark">
        <h5 className="card-title text-center"> ${lineItem.unitPrice} </h5>
        <p className="card-text text-center">  Quantity: {lineItem.lineItemQuantity} </p>
        </div>
        <button className="remove-item-btn btn btn-dark mb-2 align-items-center col-4 offset-4" onClick={this.removingLineItem}> <i className="fas fa-trash"></i> </button>
        </div>
      // <div className="SingleLineItem container">
      //   <div className="row">
      //     <h5> Product: </h5>
      //     <div className="col">
      //     {lineItem.title}
      //     </div>
      //     <h5> Unit Price: </h5>
      //     <div className="col">
      //        ${lineItem.unitPrice}
      //     </div>
      //    <h5> Quantity:</h5>
      //     <div className="col">
      //      {lineItem.lineItemQuantity}
      //     </div>

      //   </div>
      // </div>
      );
    }
}
export default SingleLineItem;
