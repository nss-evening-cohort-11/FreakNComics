import PropTypes from 'prop-types';

const OrderShape = PropTypes.shape({
  purchaseOrderId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  invoiceDate: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
});

export default { OrderShape }; // eslint-disable-line