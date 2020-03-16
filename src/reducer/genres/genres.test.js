import {reducer, ActionType} from "./genres.js";

const genres = [
  `genre1`,
  `genre2`,
  `genre3`,
  `genre4`
];

const GENRE_FILTER = `All genres`;

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genres: [],
      genreFilter: GENRE_FILTER
    });
  });

  it(`Reducer should set genres by set genres`, () => {
    expect(reducer({
      genres: []
    }, {
      type: ActionType.SET_GENRES,
      payload: genres
    })).toEqual({
      genres
    });
  });

  it(`Reducer should set filter by set filter`, () => {
    expect(reducer({
      genreFilter: GENRE_FILTER
    }, {
      type: ActionType.SELECT_GENRE_FILTER,
      payload: `New Filter Value`
    })).toEqual({
      genreFilter: `New Filter Value`
    });
  });
});
