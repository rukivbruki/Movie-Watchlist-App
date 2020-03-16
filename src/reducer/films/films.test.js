
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./films.js";

const api = createAPI(() => {});

const films = [
  {
    id: 1,
    name: `film1`,
    genre: `genre1`
  },
  {
    id: 2,
    name: `film2`,
    genre: `genre2`
  },
  {
    id: 3,
    name: `film3`,
    genre: `genre3`
  },
  {
    id: 4,
    name: `film4`,
    genre: `genre4`
  },
];

const SHOWN_CARDS_NUMBER = 8;

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      films: [],
      shownCardsNumber: SHOWN_CARDS_NUMBER,
      loading: false,
      error: ``,
      comments: []
    });
  });

  it(`Reducer should update films by set films`, () => {
    expect(reducer({
      films: [],
    }, {
      type: ActionType.SET_FILMS,
      payload: films,
    })).toEqual({
      films,
    });
  });

  it(`Reducer should increase shown cards number`, () => {
    expect(reducer({
      shownCardsNumber: SHOWN_CARDS_NUMBER
    }, {
      type: ActionType.SHOW_MORE_CARDS,
    })).toEqual({
      shownCardsNumber: SHOWN_CARDS_NUMBER * 2
    });
  });

  it(`Reducer should update error by set error`, () => {
    expect(reducer({
      error: ``
    }, {
      type: ActionType.SET_ERROR,
      payload: `test error`,
    })).toEqual({
      error: `test error`
    });
  });

  it(`Reducer should update loading by set loading`, () => {
    expect(reducer({
      loading: false
    }, {
      type: ActionType.SET_LOADING,
      payload: true,
    })).toEqual({
      loading: true
    });
  });

  it(`Reducer should update comments by set comments`, () => {
    expect(reducer({
      comments: []
    }, {
      type: ActionType.SET_COMMENTS,
      payload: [`comments`]
    })).toEqual({
      comments: [`comments`]
    });
  });
});

describe(`Operation work correctly`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();

  it(`Should make a correct API call to /films`, () => {
    const filmsLoader = Operation.loadMovies();

    apiMock
        .onGet(`/films`)
        .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalled();
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.SET_FILMS,
            payload: [{fake: true}],
          });
        });
  });

  it(`Should make a correct API call to /comments`, () => {
    const addedComment = Operation.addComment();
    const data = {
      comment: `test`,
      rating: 1
    };

    apiMock
        .onPost(`/comments/1`, data)
        .reply(200);

    return addedComment(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalled();
        });
  });

  it(`Should make a correct API call to /comments`, () => {
    const commentsLoader = Operation.loadComments(1);

    apiMock
        .onGet(`/comments/1`)
        .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalled();
          expect(dispatch).toHaveBeenCalledWith({
            type: ActionType.SET_COMMENTS,
            payload: [{fake: true}],
          });
        });
  });
});
