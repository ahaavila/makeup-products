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

  productsSearched: [],
  loadingProductsSearched: false,
  errorLoadingProductsSearched: null,
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
    case types.SEARCH_BY_TAG:
      return {
        ...state,
        productsSearched: action.payload,
        loadingProductsSearched: false,
        errorLoadingProductsSearched: null,
      }
    default:
      return state
  }
}