/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { baseUrl } from './constants.json';

const addToCart = (userId, product) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/orders/cart/${userId}`, product)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

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

const removeLineItem = (orderId, itemId) => axios.delete(`${baseUrl}/orders/${orderId}/items/${itemId}`);

export default {
  addToCart, getLineItemsByPurchaseOrderId, getCompletePurchaseOrder, removeLineItem,
};
