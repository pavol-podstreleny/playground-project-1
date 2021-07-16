import { combineReducers } from "redux";
import customersReducer from "./customers";

export default combineReducers({
  customers: customersReducer,
});
