import * as types from '../types';
import api from '../../api/api';

export const fetchProducts = () => async dispatch => {
  const response = await api.get('products.json?');
  let newArray = [];
    for (let i = 0; i <= 23; i++) {
      newArray.push(response.data[i]);
    }
  dispatch({
    type: types.GET_PRODUCTS,
    payload: {
      products: response.data,
      firstProducts: newArray,
    }
  })
}

export const setProduct = (data) => async dispatch => {
  dispatch({
    type: types.SET_PRODUCT,
    payload: data
  })
}