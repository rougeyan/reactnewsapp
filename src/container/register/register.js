import React from 'react'
import Logo from '../../conpoments/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import styled from 'styled-components'

import { Redirect} from 'react-router-dom'


import { connect } from 'react-redux'
import { regisger } from '../../redux/user.redux'

@connect(
  state => state.user, 
  { regisger }
)
 
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genuis'
    }
  }
  handleChange(key,val){
    this.setState({
      // 这里加一个[key],就能直接改变这个 键值;
      [key]: val
    })
  }
  handleRegister(){
    console.log(this.state)
    this.props.regisger(this.state);
  }
  render(){
    const RegisterText = styled.h3`
      text-align:center;
    `
    const ErrorText = styled.p`
    color: red;
    `
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        {/* //记住上面这部分是强制的 
              下面的东西就不会再理了*/ }
        <Logo/>
        <RegisterText>注册页面</RegisterText>
        <WingBlank>
          <List>
            {this.props.msg?<ErrorText>{this.props.msg}</ErrorText>: null}
            <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
            <InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
            <InputItem onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RegisterText>请选择你的身份</RegisterText>
            <RadioItem onChange={()=>this.handleChange('type','genuis')} checked={this.state.type === 'genuis'}>搬砖码农</RadioItem>
            <RadioItem onChange={()=>this.handleChange('type','boss')} checked={this.state.type === 'boss'}>米饭班主</RadioItem>
            <Button onClick={()=>this.handleRegister()} type='primary'> 注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register