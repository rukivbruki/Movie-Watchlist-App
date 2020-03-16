import * as React from 'react';
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from './movie-card';

configure({
  adapter: new Adapter()
});

const props = {
  key: 1,
  id: 1,
  name: ``,
  genre: ``,
  previewImage: ``,
  videoLink: ``,
};

jest.useFakeTimers();

describe(`MovieCard`, () => {
  it(`Should mouse enter on card`, () => {
    const setTimer = jest.fn();
    const movieCard = shallow(
        <MovieCard {...props} setTimer={setTimer}/>
    );
    movieCard.props().onMouseEnter();

    expect(setTimer).toHaveBeenCalledTimes(1);


  });

  it(`Should card be clicked`, () => {
    const onClick = jest.fn();
    const e = {preventDefault: jest.fn()};
    const movieCard = shallow(
        <MovieCard {...props} onOpenCard={onClick}/>
    );

    movieCard.props().onClick(e);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
