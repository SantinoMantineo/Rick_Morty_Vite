import {
    ADD_FAV,
    REMOVE_FAV,
    ORDER,
    RESET,
    CLEAR_FAVORITES,
    FILTER_BY_STATUS_GENDER,
  } from "./actions";
  
  let initialState = { myFavorites: [], allCharacters: [] };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_FAV:
        return {
          ...state,
          myFavorites: [...state.myFavorites, action.payload],
          allCharacters: [...state.myFavorites, action.payload],
        };
  
      case REMOVE_FAV:
        return {
          ...state,
          myFavorites: state.myFavorites.filter(
            (character) => character.id !== Number(action.payload)
          ),
          allCharacters: state.allCharacters.filter(
            (character) => character.id !== Number(action.payload)
          ),
        };
  
      case ORDER:
        let ordenados;
        if (action.payload === "Ascendente") {
          ordenados = state.myFavorites.sort((a, b) => (a.id > b.id ? 1 : -1));
        } else {
          ordenados = state.myFavorites.sort((a, b) => (b.id > a.id ? 1 : -1));
        }
        return {
          ...state,
          myFavorites: [...ordenados],
        };
  
      case FILTER_BY_STATUS_GENDER:
        const { status, gender } = action.payload;
        const filteredCharacters = state.allCharacters.filter(
          (character) =>
            (status === "" || character.status === status) &&
            (gender === "" || character.gender === gender)
        );
        return {
          ...state,
          myFavorites: filteredCharacters,
        };
  
      case RESET:
        return {
          ...state,
          myFavorites: state.allCharacters,
        };
  
      case CLEAR_FAVORITES:
        return {
          ...state,
          myFavorites: [],
          allCharacters: []
        };
  
      default:
        return {
          ...state,
        };
    }
  }