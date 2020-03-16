import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from 'react-router';
import NameSpace from "../../reducer/name-space.js";
import {MovieDetails} from './movie-details';

const mockStore = configureStore([]);

const noop = () => void 0;

const cardData = {
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

const films = [cardData];

const user = {
  id: 1,
  email: `test@email.com`,
  name: `test user`,
  avatarUrl: `avatar`
};

const props = {
  isAuth: true,
  cardData,
  films,
  onOpenCard: noop,
  filteredFilms: films,
  setActivePlayer: noop,
  updateFavorite: noop,
  loadFavorites: noop,
  match: {
    isExact: false,
    params: {
      id: 1
    },
    path: ``,
    url: ``
  }
};

it(`MovieDetails renders correctly`, () => {
  const store = mockStore({
    [NameSpace.GENRES]: {
      genres: [`genre1`, `genre2`],
      genreFilter: `All genres`
    },
    [NameSpace.FILMS]: {
      films
    },
    [NameSpace.USER]: {
      user
    }
  });

  const tree = renderer
    .create(
        <MemoryRouter initialEntries={[`/test`]} >
          <Provider store={store}>
            <MovieDetails {...props}/>
          </Provider>
        </MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
