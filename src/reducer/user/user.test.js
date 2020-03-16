
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {AUTH, NO_AUTH} from '../../consts.js';
import {reducer, ActionType, Operation} from "./user.js";

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: NO_AUTH,
      user: {},
      error: ``
    });
  });

  it(`Reducer should update auth status by set status`, () => {
    expect(reducer({
      authorizationStatus: NO_AUTH,
    }, {
      type: ActionType.SET_AUTH,
      payload: `New Auth Status`,
    })).toEqual({
      authorizationStatus: `New Auth Status`
    });
  });

  it(`Reducer should update user data by set user data`, () => {
    expect(reducer({
      user: {},
    }, {
      type: ActionType.SET_USER,
      payload: {
        id: 1,
      },
    })).toEqual({
      user: {
        id: 1,
      }
    });
  });

  it(`Reducer should update error status by set error`, () => {
    expect(reducer({
      error: ``
    }, {
      type: ActionType.SET_ERROR,
      payload: `test error`,
    })).toEqual({
      error: `test error`
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to check`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.check();

    apiMock
        .onGet(`/login`)
        .reply(200);

    return checkAuth(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(3);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.SET_AUTH,
            payload: AUTH,
          });
        });
  });

  it(`Should make a correct API call to login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({
      email: `fakeemail@fake.com`,
      password: `123456`
    });

    apiMock
        .onPost(`/login`)
        .reply(200);

    return login(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(3);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.SET_AUTH,
            payload: AUTH,
          });
        });
  });
});
