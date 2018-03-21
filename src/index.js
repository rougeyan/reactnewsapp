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
import Login from './container/login/login'

import Register from './container/register/register'

import reducers from './reducer'
// 全局reducer

import './config'
// 路由拦截器

import 'antd-mobile/dist/antd-mobile.css';
// 引入antd全局样式

// compose 是为了加入移步中间件 以及window的调试;
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (<Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </div>
      </BrowserRouter>
    {/* <App /> */}
</Provider>), document.getElementById('root'));
registerServiceWorker();
