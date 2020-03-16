import * as React from "react";
import * as renderer from "react-test-renderer";
import {VideoPlayer} from './video-player';

const noop = () => void 0;

const match = {
  isExact: false,
  params: {
    id: 1
  },
  path: ``,
  url: ``
};

const props = {
  onClosePlayer: noop,
  onClickPlayButton: noop,
  elapsedTime: ``,
  onChangeMode: noop,
  progress: 1,
  paused: noop,
  match
};

it(`VideoPlayer renders correctly`, () => {
  const tree = renderer
    .create(<VideoPlayer {...props} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
