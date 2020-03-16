import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.GENRES;

export const getGenres = (state) => state[NAME_SPACE].genres;
export const getGenreFilter = (state) => state[NAME_SPACE].genreFilter;
