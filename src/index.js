import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import Reducer from "./reducer/index";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

const store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
