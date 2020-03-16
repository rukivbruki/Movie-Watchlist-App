import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Avatar} from "./avatar";

const mockStore = configureStore([]);

it(`Avatar renders correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: {
        id: 1,
        email: `test@email.com`,
        name: `test user`,
        avatarUrl: `avatar`
      }
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Avatar />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
