import React from 'react'
import Logo from '../../conpoments/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import styled from 'styled-components'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }
  // 跳转到注册页面 路由组件
  register(){
    console.log(this.props)
    // 注意这里为什么这么写? 是因为一般的路由组件直接都做这样的操作
    this.props.history.push('/register');
  }
  render(){
    const LoginText = styled.h3`
      text-align:center;
    `
    return (
      <div>
        <Logo/>
        <LoginText>登陆页面</LoginText>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type='primary'>登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login