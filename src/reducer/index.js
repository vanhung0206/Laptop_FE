import { combineReducers } from "redux";
import modalLogin from "./modalLogin";
import cart from "./cart";
import user from "./user";
const reducer = combineReducers({ modalLogin, cart, user });

export default reducer;
