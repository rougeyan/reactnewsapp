import React from 'react'
import Logo from '../../conpoments/logo/logo'
import {List, InputItem, Radio, WingBlank, Button,WhiteSpace} from 'antd-mobile'
import styled from 'styled-components'

import { Redirect} from 'react-router-dom'
import  LowHOC  from '../../conpoments/HOC/hoc'


import { connect } from 'react-redux'
import { regisger } from '../../redux/user.redux'

import browserCookies from 'browser-cookies'

@connect(
  state => state.user, 
  { regisger }
)
@LowHOC
class Register extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user:'',
    //   pwd:'',
    //   repeatpwd:'',
    //   type: 'genius'
    // }
  }
  componentDidMount(){
    // 自动清除cookies;
    browserCookies.erase('userid');
    
    //对一些默认值的设置
    this.props.handleChange('type','genius')
  }
  // handleChange(key,val){
  //   this.setState({
  //     // 这里加一个[key],就能直接改变这个 键值;
  //     [key]: val
  //   })
  // }
  handleRegister(){
    console.log(this.state)
    this.props.regisger(this.props.state);
  }
  login(){
    this.props.history.push('/login');
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
        {console.log(this.props)}
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        {/* //记住上面这部分是强制的 
              下面的东西就不会再理了*/ }
        <Logo/>
        <RegisterText>注册页面</RegisterText>
        <WingBlank>
          <List>
            {this.props.msg?<ErrorText>{this.props.msg}</ErrorText>: null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RegisterText>请选择你的身份</RegisterText>
            <RadioItem onChange={()=>this.props.handleChange('type','genius')} checked={this.props.state.type === 'genius'}>搬砖码农</RadioItem>
                                                                                        {/* // 这里要注意 是从props. 穿进来的state */}
            <RadioItem onChange={()=>this.props.handleChange('type','boss')} checked={this.props.state.type === 'boss'}>米饭班主</RadioItem>
            <WhiteSpace></WhiteSpace>
            <Button onClick={()=>this.handleRegister()} type='primary'> 注册</Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={()=>this.login()} type='primary'> 返回登陆</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register