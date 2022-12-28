import { combineReducers } from "redux";
import phoneBookReducers from "./phoneBook_reducers";

export default combineReducers({
    phoneBook: phoneBookReducers
})

//Unused due to single reducer config, check on the store line in App.js