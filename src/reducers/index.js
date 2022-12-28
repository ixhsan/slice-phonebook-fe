import { combineReducers } from "redux";
import phoneBookReducers from "./phoneBook_reducers";

export default combineReducers({
    phoneBook: phoneBookReducers
})