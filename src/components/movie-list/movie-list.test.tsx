import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {MovieList} from './movie-list';

const mockStore = configureStore([]);

const noop = () => void 0;

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

const props = {
  filteredFilms: films,
  onOpenCard: noop,
  shownCardsNumber: 1,
  setActiveItem: noop,
  removeActiveItem: noop,
  setTimer: noop,
  removeTimer: noop,
  activeItem: film,
};

it(`MovieList renders correctly`, () => {
  const store = mockStore({
    films,
    filteredFilms: films
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <MovieList {...props}/>
          </Provider>
        </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
