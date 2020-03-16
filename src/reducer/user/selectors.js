import NameSpace from "../name-space.js";
import {AUTH} from '../../consts.js';

const NAME_SPACE = NameSpace.USER;

export const getIsAuth = (state) => state[NAME_SPACE].authorizationStatus === AUTH;
export const getUser = (state) => state[NAME_SPACE].user;
