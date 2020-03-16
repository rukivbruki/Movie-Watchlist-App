import * as React from "react";
import * as renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router';
import MovieCard from './movie-card';

const props = {
  key: 1,
  id: 1,
  name: ``,
  genre: ``,
  previewImage: ``,
  videoLink: ``,
};

it(`MovieCard renders correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter initialEntries={[`/test`]} >
          <MovieCard {...props}/>
        </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
