import * as React from "react";
import * as renderer from "react-test-renderer";
import {Genres} from "./genres";

const genres = [`genre1`, `genre2`, `genre3`];

const film = {
  backgroundColor: `red`,
  backgroundImage: `img`,
  description: `desc`,
  director: `dir`,
  genre: `genre`,
  id: 1,
  isFavorite: false,
  name: `film`,
  posterImage: `img`,
  previewImage: `img`,
  previewVideoLink: `video`,
  rating: 1,
  released: 1,
  runTime: 1,
  scoresCount: 1,
  starring: [`test`],
  videoLink: `video`
};

const films = [film];
const genreFilter = `test1`;

it(`Genres renders correctly`, () => {
  const tree = renderer
    .create(
        <Genres
          genres={genres}
          genreFilter={genreFilter}
          films={films}
          onSelectGenre={() => void 0} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
