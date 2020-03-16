import * as React from "react";
import * as renderer from "react-test-renderer";
import {Tabs} from './tabs';

it(`Tabs renders correctly`, () => {
  const tree = renderer
    .create(<Tabs />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
