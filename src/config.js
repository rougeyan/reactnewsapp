// 这里存放前端路由拦截器
import axios from 'axios';
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config){
  Toast.loading("加载中",0)
  return config
})

// 拦截响应
axios.interceptors.response.use(function(config){
  //全局配置和全局销毁方法：
  Toast.hide();
  return config
})