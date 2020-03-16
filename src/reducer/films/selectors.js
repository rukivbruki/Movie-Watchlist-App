import {createSelector} from "reselect";
import {filterFilmsByGenre} from "../../utils/filterFilmsByGenre.js";
import NameSpace from "../name-space.js";
import {getGenreFilter} from '../genres/selectors.js';

const NAME_SPACE = NameSpace.FILMS;

export const getFilms = (state) => state[NAME_SPACE].films;
export const getShownCardsNumber = (state) => state[NAME_SPACE].shownCardsNumber;
export const getComments = (state) => state[NAME_SPACE].comments;
export const getLoading = (state) => state[NAME_SPACE].loading;
export const getError = (state) => state[NAME_SPACE].error;

export const getFilmsByGenre = createSelector(
    getGenreFilter,
    getFilms,
    (genre, films) => filterFilmsByGenre(genre, films)
);

