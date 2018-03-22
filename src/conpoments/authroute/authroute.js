import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'
// import apiManage from '../../api/apiManage'; //这里是测试管理api的接口// 后续优化 
@withRouter
@connect(
  null,
  {loadData}
)
/**
 * 这里引入withRouter 
 * 以及使用@withRouter
 * 是因为我们本来AuthRoute 这一层不是路由组件
 * this.props.history 会显示undefined
 * 没有路由的方法, this.props.history 是没有的
 * 但是我们通过withRouter 给它包裹一层之后
 * 这个组件就有了一些路由组件的方法
 * 然后我们可以有一些操作;
 */

 /**
  * 实际上我们加载这个null组件,,挂在到index中渲染,就是为了检验状态,
  * 但是我们一旦拦截的部分多了的话,我们需要把这部分交给redux做做状态管理
  */
class AuthRoute extends React.Component {
  componentDidMount(){
    // 测试 apiManage.testget()
    console.log(this.props.history)
    // 这里就是判断是否登录页或者注册页 就不会管? 
    // 判断来源 如果找到则返回 不会重新跳转?
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf[pathname]>-1){
      return null
    }    
    // // 获取用户信息
    axios.get('/user/info')
      .then(res=>{
        if(res.status === 200){
          if(res.data.code === 0){
            this.props.loadData(res.data.data);    
          }
        }else{
          this.props.history.push('/login')
        }
    })
    // 获取用户信息;
    // 是否登陆
    // 现在的url地址, login是不需要跳转的,
    // 用户的type 身份是boss 还是牛人
    // 用户是否完善自己的信息(选择个人头先/简介,)
  }
  render(){
    return null
  }
}

export default AuthRoute