import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composeEnhancers);

export default store;
export type AppDispatch = typeof store.dispatch;
