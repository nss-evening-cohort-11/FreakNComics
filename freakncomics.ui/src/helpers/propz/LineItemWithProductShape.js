import PropTypes from 'prop-types';

const LineItemWithProductShape = PropTypes.shape({
  lineItemId: PropTypes.number.isRequired,
  purchaseOrderId: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  lineItemQuantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
});

export default { LineItemWithProductShape }; //eslint-disable-line
