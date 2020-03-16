import * as React from 'react';
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Player from './player';

configure({
  adapter: new Adapter()
});

const props = {
  src: `video.mp4`,
  img: `img/name1.jpg`,
};

it(`Player should be rendered depends on prps`, () => {
  const activePlayer = mount(<Player {...props} active/>);
  const activePlayerInstance = activePlayer.instance();
  activePlayerInstance.componentDidUpdate({active: false}, {active: true});
  expect(activePlayer.state(`active`)).toBe(true);

  const nonActivePlayer = mount(<Player {...props} active={false}/>);
  const nonActivePlayerInstance = nonActivePlayer.instance();
  nonActivePlayerInstance.componentDidUpdate({active: true}, {active: true});
  expect(nonActivePlayer.state(`active`)).toBe(false);
});
