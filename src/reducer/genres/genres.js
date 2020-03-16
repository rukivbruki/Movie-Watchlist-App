import {extend} from "../../utils/extend";

const initialState = {
  genres: [],
  genreFilter: `All genres`,
};

export const ActionType = {
  SET_GENRES: `SET_GENRES`,
  SELECT_GENRE_FILTER: `SELECT_GENRE_FILTER`,
};

export const ActionCreator = {
  setGenres: (list) => ({
    type: ActionType.SET_GENRES,
    payload: list
  }),
  selectGenreFilter: (genre) => ({
    type: ActionType.SELECT_GENRE_FILTER,
    payload: genre
  }),

};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRES:
      return extend(state, {
        genres: action.payload
      });
    case ActionType.SELECT_GENRE_FILTER:
      return extend(state, {
        genreFilter: action.payload
      });
    default:
      return state;
  }
};

