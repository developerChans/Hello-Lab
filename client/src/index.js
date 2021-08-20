import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import LabStore from 'components/LabStore';

ReactDOM.render(
  <Provider store={LabStore}>
    <App />
  </Provider>
  ,document.getElementById('root'));