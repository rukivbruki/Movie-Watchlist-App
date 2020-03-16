import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.FAVORITES;

export const getFavorites = (state) => state[NAME_SPACE].favorites;
