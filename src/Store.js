import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducer/rootReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";


const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default Store;