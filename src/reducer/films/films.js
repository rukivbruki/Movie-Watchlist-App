import {extend} from "../../utils/extend";
import {keysToCamel} from '../../utils/toCamel';
import {ActionCreator as GenresActionCreater} from '../genres/genres.js';

const SHOWN_CARDS_STEP = 8;
const getFilmGenres = (films) => [`All genres`, ...new Set(films.map((film) => film.genre))];

const initialState = {
  films: [],
  shownCardsNumber: SHOWN_CARDS_STEP,
  comments: [],
  loading: false,
  error: ``
};

export const ActionType = {
  SET_FILMS: `SET_FILMS`,
  SHOW_MORE_CARDS: `SHOW_MORE_CARDS`,
  SET_COMMENTS: `SET_COMMENTS`,
  SET_LOADING: `SET_LOADING`,
  SET_ERROR: `SET_ERROR`
};

export const ActionCreator = {
  setFilms: (list) => ({
    type: ActionType.SET_FILMS,
    payload: list
  }),
  showMoreCards: () => ({
    type: ActionType.SHOW_MORE_CARDS
  }),
  setComments: (comments) => ({
    type: ActionType.SET_COMMENTS,
    payload: comments
  }),
  setLoading: (loading) => ({
    type: ActionType.SET_LOADING,
    payload: loading
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
};

export const Operation = {
  loadMovies: () => (dispatch, _, api) => {
    return api.get(`/films`)
      .then(({data: films}) => {
        dispatch(ActionCreator.setFilms(films.map((film) => keysToCamel(film))));
        dispatch(GenresActionCreater.setGenres(getFilmGenres(films)));
      });
  },
  addComment: (filmId, data, cb) => (dispatch, _1, api) => {
    dispatch(ActionCreator.setLoading(true));
    dispatch(ActionCreator.setError(``));
    return api.post(`/comments/${filmId}`, data)
      .then(() => {
        dispatch(ActionCreator.setLoading(false));
        if (typeof cb === `function`) {
          cb();
        }
      },
      (error) => {
        dispatch(ActionCreator.setLoading(false));
        dispatch(ActionCreator.setError(error.toString()));
      });
  },
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`/comments/${id}`)
      .then(({data}) => {
        const comments = data.map((comment) => keysToCamel(comment));
        dispatch(ActionCreator.setComments(comments));
      });
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILMS:
      return extend(state, {
        films: action.payload
      });
    case ActionType.SHOW_MORE_CARDS:
      return extend(state, {
        shownCardsNumber: state.shownCardsNumber + SHOWN_CARDS_STEP
      });
    case ActionType.SET_COMMENTS:
      return extend(state, {
        comments: action.payload
      });
    case ActionType.SET_LOADING:
      return extend(state, {
        loading: action.payload
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        error: action.payload
      });
    default:
      return state;
  }
};
