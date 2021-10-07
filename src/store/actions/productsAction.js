import * as types from '../types';
import api from '../../api/api';

export const fetchProducts = () => async dispatch => {
  const response = await api.get();
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

export const searchByTag = (tag) => async dispatch => {
  const response = await api.get(`product_tags=${tag}`)
  dispatch({
    type: types.SEARCH_BY_TAG,
    payload: response.data
  })
}