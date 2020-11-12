import React from 'react';
import ProductData from '../../helpers/data/ProductData';
import LineItemShape from '../../helpers/propz/LineItemShape';

class SingleLineItem extends React.Component {
    static propTypes = {
      lineItem: LineItemShape.LineItemShape,
    }

    state = {
      product: {},
    }

    getProductbyLineItemId = () => {
      const { lineItem } = this.props;
      ProductData.getSingleProduct(lineItem.productId)
        .then((resp) => {
          this.setState({ product: resp });
        })
        .catch((err) => console.error(err));
    }

    componentDidMount() {
      this.getProductbyLineItemId();
    }

    removingLineItem = (e) => {
      e.preventDefault();
      const { lineItem, removeLineItem } = this.props;
      removeLineItem(lineItem.purchaseOrderId, lineItem.lineItemId);
    }

    render() {
      const { lineItem } = this.props;
      const { product } = this.state;

      return (
      <div className="SingleLineItem container">
        <div className="row">
          <h5>
         Product:
          </h5>
          <div className="col">
          {product.title}
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
