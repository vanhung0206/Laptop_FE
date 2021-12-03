import { combineReducers } from "redux";
import modalLogin from "./modalLogin";
import cart from "./cart";
import user from "./user";
import reply from "./reply";

const reducer = combineReducers({ modalLogin, cart, user, reply });

export default reducer;
