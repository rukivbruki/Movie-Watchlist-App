import * as React from "react";
import * as renderer from "react-test-renderer";
import Player from './player';

const props = {
  src: `video.mp4`,
  img: `img/name1.jpg`,
};

it(`Player renders correctly`, () => {
  const tree = renderer
    .create(
        <Player {...props} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
