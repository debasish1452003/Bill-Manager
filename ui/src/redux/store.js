import { createStore, combineReducers } from "redux";
import billsReducer from "./reducers/billReducer.js";

const rootReducer = combineReducers({
  bills: billsReducer, // Ensure this key matches the one used in `useSelector`
});

const store = createStore(rootReducer);

export default store;
