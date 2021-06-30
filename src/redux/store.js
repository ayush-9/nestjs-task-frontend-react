import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { signupReducer } from "./reducers/signup.reducer";
import { signinReducer } from "./reducers/signin.reducer";
import { gettasksReducer } from "./reducers/gettasks.reducer";

const rootReducer = combineReducers({
  signupdata: signupReducer,
  signindata: signinReducer,
  gettasksdata: gettasksReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
