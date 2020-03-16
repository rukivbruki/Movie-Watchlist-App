import {AUTH, NO_AUTH} from '../../consts.js';
import {extend} from "../../utils/extend";
import {keysToCamel} from '../../utils/toCamel';

const initialState = {
  authorizationStatus: NO_AUTH,
  user: {},
  error: ``
};

export const ActionType = {
  SET_AUTH: `SET_AUTH`,
  SET_USER: `SET_USER`,
  SET_ERROR: `SET_ERROR`,
};

export const ActionCreator = {
  setAuth: (status) => ({
    type: ActionType.SET_AUTH,
    payload: status
  }),
  setUser: (data) => ({
    type: ActionType.SET_USER,
    payload: data
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
};

export const Operation = {
  check: () => (dispatch, _, api) => {
    return api.get(`/login`).then(({data}) => {
      dispatch(ActionCreator.setAuth(AUTH));
      dispatch(ActionCreator.setUser(keysToCamel(data)));
      dispatch(ActionCreator.setError(``));
    })
    .catch((error) => {
      dispatch(ActionCreator.setError(`Failed check auth. Error: ${error}`));
    });
  },
  login: ({email, password}) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email,
      password
    }).then(({data}) => {
      dispatch(ActionCreator.setAuth(AUTH));
      dispatch(ActionCreator.setUser(keysToCamel(data)));
      dispatch(ActionCreator.setError(``));
    })
    .catch((error) => {
      dispatch(ActionCreator.setError(`Failed login. Error: ${error}`));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_USER:
      return extend(state, {
        user: action.payload
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        error: action.payload
      });
    default:
      return state;
  }
};

