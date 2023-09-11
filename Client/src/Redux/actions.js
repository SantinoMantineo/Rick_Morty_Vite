export const ADD_FAV = 'ADD_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'
export const ORDER = 'ORDER'
export const FILTER_BY_STATUS_GENDER = "FILTER_BY_STATUS_GENDER";
export const RESET = 'RESET'
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES'

import axios from "axios"

 export const addFavorite = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };
};


 export const removeFavorite = (id) => {
   const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;

   return async (dispatch) => {
    try{     
      const { data } = await axios.delete(endpoint);
      dispatch({
      type: REMOVE_FAV,
      payload: data,
    })
  } catch(error){
    console.error('Error al eliminar de favoritos:', error);
  }
 }}
 
export function orderFavorites(order) {
    return {
        type: ORDER,
        payload: order,
    }
};

export function filterByStatusAndGender(status, gender) {
    return {
      type: FILTER_BY_STATUS_GENDER,
      payload: { status, gender },
    };
  }

export function resetFavorites() {
    return {
        type: RESET,
    }
}

export const clearFavorites = () => {
    return {
      type: CLEAR_FAVORITES,
    };
  };