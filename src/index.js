import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import reducers from './reducer'
// 全局reducer

import './config'
// 路由拦截器

// compose 是为了加入移步中间件 以及window的调试;
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (<Provider store={store}>
      <BrowserRouter>
        <h1>123</h1>
      </BrowserRouter>
    {/* <App /> */}
</Provider>), document.getElementById('root'));
registerServiceWorker();
