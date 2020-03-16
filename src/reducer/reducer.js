import {combineReducers} from "redux";
import {reducer as films} from "./films/films.js";
import {reducer as genres} from "./genres/genres.js";
import {reducer as user} from "./user/user.js";
import {reducer as favorites} from "./favorites/favorites.js";
import {reducer as promo} from "./promo/promo.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.GENRES]: genres,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITES]: favorites,
  [NameSpace.PROMO]: promo
});
