import axios from 'axios';
import { baseUrl } from './constants.json';

const getLineItemsByPurchaseOrderId = (orderId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/${orderId}/items`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getCompletePurchaseOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/active-orders/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getLineItemsByPurchaseOrderId, getCompletePurchaseOrder };
