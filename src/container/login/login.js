import React from 'react'
import Logo from '../../conpoments/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect }from 'react-router-dom'
import { login } from '../../redux/user.redux'
import  LowHOC  from '../../conpoments/HOC/hoc'

import browserCookies from 'browser-cookies'

@connect(
  state => state.user,
  { login }
)
@LowHOC
class Login extends React.Component {
  constructor(props) {
    super(props)
    // this.state={
    //   user:'',
    //   pwd:''
    // }
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.goexplain =this.goexplain.bind(this);
  }
  componentDidMount(){
    browserCookies.erase('userid');
  }
  // 跳转到注册页面 路由组件
  register(){
    console.log(this.props)
    // 注意这里为什么这么写? 是因为一般的路由组件直接都做这样的操作
    this.props.history.push('/register');
  }
  handleLogin(){
    this.props.login(this.props.state);
  }
  // handleChange(key,val){  
  //   this.setState({
  //     // 这里加一个[key],就能直接改变这个 键值;
  //     [key]: val
  //   })
  // }
  goexplain(){
    this.props.history.push('/explain')
  }
  render(){
    const LoginText = styled.h3`
      text-align:center;
    `
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo!='/login'? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo/>
        <LoginText>登陆页面</LoginText>
        {this.props.msg?<LoginText>{this.props.msg}</LoginText>: null}
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type='primary'>注册</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.goexplain} type='primary'>使用说明</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login