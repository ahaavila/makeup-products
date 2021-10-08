import * as types from '../types';

const initialState = {
  products: {
    products: [],
    firstProducts: []
  },
  loadingProducts: false,
  errorLoadingProducts: null,

  product: [],
  loadingProduct: false,
  errorLoadingProduct: null,
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loadingProducts: false,
        errorLoadingProducts: null,
      }
    case types.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loadingProduct: false,
        errorLoadingProduct: null,
      }
    default:
      return state
  }
}