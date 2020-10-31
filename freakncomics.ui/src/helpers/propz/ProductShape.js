import PropTypes from 'prop-types';

const ProductShape = PropTypes.shape({
  productId: PropTypes.string.isRequired,
  productTypeId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
});
export default ProductShape;
