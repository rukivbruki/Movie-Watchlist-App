
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./promo.js";

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promo: {}
    });
  });

  it(`Reducer should update promo by set promo`, () => {
    expect(reducer({
      promo: {},
    }, {
      type: ActionType.SET_PROMO,
      payload: {
        test: `1`
      },
    })).toEqual({
      promo: {
        test: `1`
      }
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to load promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadPromo = Operation.loadPromo();

    apiMock
        .onGet(`/films/promo`)
        .reply(200, [{fake: true}]);

    return loadPromo(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.SET_PROMO,
            payload: [{fake: true}]
          });
        });
  });
});
