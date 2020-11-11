import PropTypes from 'prop-types';

const LineItemShape = PropTypes.shape({
  lineItemId: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  purchaseOrderId: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  lineItemQuantity: PropTypes.number.isRequired,
});

export default { LineItemShape }; //eslint-disable-line
