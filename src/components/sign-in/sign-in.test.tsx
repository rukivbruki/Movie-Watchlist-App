import * as React from "react";
import * as renderer from "react-test-renderer";
import {SignIn} from './sign-in';

const noop = () => void 0;

const props = {
  email: `fakeemail@mail.com`,
  password: `123456`,
  onSubmit: noop,
  onChangeEmail: noop,
  onChangePassword: noop
};

it(`SignIn renders correctly`, () => {
  const tree = renderer
    .create(
        <SignIn {...props} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
