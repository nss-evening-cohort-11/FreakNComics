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
        </div>
      </div>
      );
    }
}
export default SingleLineItem;
