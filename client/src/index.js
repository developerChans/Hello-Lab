import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
<<<<<<< HEAD
import {createStore} from 'redux';
import Reducer from './_reducers';
const store = createStore(Reducer);
ReactDOM.render(
  <Provider
  store={store}>
    <App />
  </Provider>
  ,document.getElementById('root'));
=======
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "_store/index";

const{store, persistor} = configureStore();

const Root = () =>(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App /> 
    </PersistGate>
  </Provider>
);
ReactDOM.render(<Root/>, document.getElementById('root'));
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
