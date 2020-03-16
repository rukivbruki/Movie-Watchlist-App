import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresItem from "./genres-item";

it(`GenresItem renders correctly`, () => {
  const tree = renderer
    .create(
        <GenresItem
          genre={`test`}
          onClick={() => void 0} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
