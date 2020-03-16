import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {App} from './app';

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

it(`App renders correctly`, () => {
  const store = mockStore({
    [NameSpace.GENRES]: {
      genres: [`genre1`, `genre2`],
      genreFilter: `All genres`
    },
    [NameSpace.FILMS]: {
      films
    },
    [NameSpace.PROMO]: {
      promo: films[0]
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: {
        id: 1,
        email: `test@email.com`,
        name: `test user`,
        avatarUrl: `avatar`
      }
    },
    [NameSpace.FAVORITES]: {
      favorites: films
    },
  });

  const props = {
    setActiveItem: noop,
    setActivePlayer: noop,
    filteredFilms: [film],
    promo: film,
    films,
  };

  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <App {...props}/>
          </BrowserRouter>
        </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
