import { combineReducers } from "redux";
import phoneBookReducers from "./UserList_reducers";

export default combineReducers({
    phoneBook: phoneBookReducers
})