import React from 'react'
import { Result, List, WingBlank, WhiteSpace, Button, Modal} from 'antd-mobile';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


import browserCookies from 'browser-cookies'

  
  const Pic =styled.img`
    width:50px;
    height:50px;
  `
  const ErrorP = styled.p`
    width:100%;
    height:100%;
    text-align:center;
    font-size:24px;
    margin-top: 50%;
  `
@connect(
  state =>state.user,
  {logoutSubmit}
)

class User extends React.Component{
  constructor(props){
    super(props)
    this.logout =this.logout.bind(this);
  }

  logout(){
    const alert = Modal.alert;
    alert('注销',"确认退出?",[
      {text: '取消',onPress:()=>console.log('cancel')},
      {text: '确认',onPress:()=>{
        // 清除浏览器的cookies
        browserCookies.erase('userid');
        // 改变redux的数据, 注意这里是同步函数 直接去dispath;

        // 但是 移步的话 这里救赎一个函数然后回调一个dispath=>{}
        this.props.logoutSubmit()
      } 
    }])
  }
  render(){
    const Item = List.Item;
    const Brief = Item.Brief;
    console.log(this.props);

    return this.props.user?(
      <div>
        <Result img={<Pic src={require('../logo/logo.jpg')} alt="" />}
                title={`${this.props.user}的个人中心`}
                message={this.props.type === 'boss'? this.props.company:''}
        ></Result>
        <List renderHeader={()=>'简介'}>
          <Item>{this.props.title}
            <WingBlank>
              {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
              {this.props.money?<Brief>薪资:{this.props.money}</Brief>:null}
            </WingBlank>
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List renderHeader={()=>'退出登陆'}>
        <WingBlank>
          <Item onClick={this.logout}>退出</Item>
        </WingBlank>
        </List>
      </div>
    ):<Redirect to={this.props.redirectTo}></Redirect>
  }
}

export default User