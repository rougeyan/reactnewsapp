import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './container/login/login'
import AuthRoute from './conpoments/authroute/authroute'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './conpoments/dashboard/dashboard'
import Chat from './conpoments/chat/chat'
import Explain from './container/explain/explain'

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
          {/* AuthRoute这个组件加载实际上就是检验登陆状态*/}
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route path='/bossinfo' component={BossInfo}></Route>
            <Route path='/chat/:user' component={Chat}></Route>
            <Route path='/explain' component={Explain}/>
            {/* //只要不指定这个 path 所有都会命中这个东西 */}
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    {/* <App /> */}
</Provider>), document.getElementById('root'));
registerServiceWorker();
