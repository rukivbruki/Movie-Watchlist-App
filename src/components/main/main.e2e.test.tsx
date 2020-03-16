import * as React from 'react';
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import Main from './main';

const mockStore = configureStore([]);

const promoData = {
  name: `promoName`,
  genre: `promoGenre`,
  releaseDate: 0,
};

const moviesList = [
  {
    name: `name1`,
    img: `img/name1.jpg`,
  },
  {
    name: `name2`,
    img: `img/name2.jpg`,
  },
  {
    name: `name3`,
    img: `img/name3.jpg`,
  },
];

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

configure({
  adapter: new Adapter()
});

it(`Should title be clicked`, () => {
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
  const onTitleClick = jest.fn();

  const main = shallow(
      <Provider store={store}>
        <Main promoData={promoData} moviesList={moviesList} onTitleClick={onTitleClick} />
      </Provider>
  );

  const titles = main.find(`.small-movie-card__title`);
  const titlesLength = titles.length;

  titles.forEach((title) => title.simulate(`click`));

  expect(onTitleClick).toHaveBeenCalledTimes(titlesLength);
});
