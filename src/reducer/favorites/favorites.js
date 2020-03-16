import {extend} from "../../utils/extend";
import {keysToCamel} from '../../utils/toCamel';

const initialState = {
  favorites: [],
  error: ``
};

export const ActionType = {
  SET_FAVORITES: `SET_FAVORITES`,
  SET_ERROR: `SET_ERROR`
};

export const ActionCreator = {
  setFavorites: (list) => ({
    type: ActionType.SET_FAVORITES,
    payload: list
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
};

export const Operation = {
  loadFavorites: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
    .then(({data: favorites}) => {
      dispatch(ActionCreator.setFavorites(favorites.map((film) => keysToCamel(film))));
      dispatch(ActionCreator.setError(``));
    })
    .catch((error) => {
      dispatch(ActionCreator.setError(`Failed load favorite films. Error: ${error}`));
    });
  },

  setFavoriteStatus: (id, status, cb) => (dispatch, _1, api) => {
    return api.post(`/favorite/${id}/${status}`)
    .then(() => {
      if (typeof cb === `function`) {
        cb();
      }
      dispatch(ActionCreator.setError(``));
    })
    .catch((error) => {
      dispatch(ActionCreator.setError(`Failed load favorite films. Error: ${error}`));
    });
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FAVORITES:
      return extend(state, {
        favorites: action.payload
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        error: action.payload
      });
    default:
      return state;
  }
};
