import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {AUTH} from '../../consts.js';
import {BrowserRouter} from "react-router-dom";
import withCheckAuth from './with-check-auth';
import NameSpace from "../../reducer/name-space.js";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

interface MockComponentProps {
  children: React.ReactNode;
}

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withCheckAuth(MockComponent);

it(`withCheckAuth renders correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AUTH,
    }
  });

  const tree = renderer.create((
    <Provider store={store}>
      <BrowserRouter>
        <MockComponentWrapped/>
      </BrowserRouter>
    </Provider>

  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
