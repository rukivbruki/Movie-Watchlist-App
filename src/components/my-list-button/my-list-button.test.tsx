import * as React from "react";
import * as renderer from "react-test-renderer";
import MyListButton from "./my-list-button";

const props = {
  isFavorite: true,
  isAuth: true,
  onClick: () => void 0
};

it(`MyListButton renders correctly`, () => {
  const tree = renderer.create(<MyListButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
