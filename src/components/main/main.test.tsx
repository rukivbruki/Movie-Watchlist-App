import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from 'react-router-dom';
import NameSpace from "../../reducer/name-space.js";
import Main from './main';

const mockStore = configureStore([]);

const promoData = {
  name: `promoName`,
  genre: `promoGenre`,
  releaseDate: 0,
};

const films = [
  {
    id: 1,
    name: `name1`,
    img: `img/name1.jpg`,
  },
  {
    id: 2,
    name: `name2`,
    img: `img/name2.jpg`,
  },
  {
    id: 3,
    name: `name3`,
    img: `img/name3.jpg`,
  },
];

const user = {
  id: 1,
  email: `test@email.com`,
  name: `test user`,
  avatarUrl: `avatar`
};

it(`Main renders correctly`, () => {
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
    },
    [NameSpace.FAVORITES]: {
      favorites: films
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <Main promoData={promoData} filteredFilms={films}/>
          </Provider>
        </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
