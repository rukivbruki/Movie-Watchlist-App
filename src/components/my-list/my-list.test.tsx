import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {MyList} from "./my-list";

const mockStore = configureStore([]);

const props = {
  loadFavorites: () => void 0
};

const favorites = [
  {
    id: 1,
    name: `test`
  },
  {
    id: 2,
    name: `test`
  },
  {
    id: 3,
    name: `test`
  },
];

it(`MyList renders correctly`, () => {
  const store = mockStore({
    [NameSpace.FAVORITES]: {
      favorites,
    },
    [NameSpace.USER]: {
      user: {
        id: 1,
        email: `test@email.com`,
        name: `test user`,
        avatarUrl: `avatar`
      }
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <MyList {...props} />
        </BrowserRouter>
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
