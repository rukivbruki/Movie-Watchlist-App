import {extend} from "../../utils/extend";
import {keysToCamel} from '../../utils/toCamel';

const initialState = {
  promo: {}
};

export const ActionType = {
  SET_PROMO: `SET_PROMO`
};

export const ActionCreator = {
  setPromo: (data) => ({
    type: ActionType.SET_PROMO,
    payload: data
  }),
};

export const Operation = {
  loadPromo: () => (dispatch, _, api) => {
    return api.get(`/films/promo`)
          .then(({data}) => {
            dispatch(ActionCreator.setPromo(keysToCamel(data)));
          });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PROMO:
      return extend(state, {
        promo: action.payload
      });
    default:
      return state;
  }
};
