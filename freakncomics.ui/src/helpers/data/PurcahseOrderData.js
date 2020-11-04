import axios from 'axios';
import { baseUrl } from './constants.json';

const getLineItemsByPurchaseOrderId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/orders/orderId/items`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getLineItemsByPurchaseOrderId };
