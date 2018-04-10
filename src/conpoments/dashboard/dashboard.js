import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../../conpoments/msg/msg'

import { NavBar } from 'antd-mobile';
import NavLinkBar  from '../../conpoments/navlinkbar/navlinkbar'

import { getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'


const  Mheader = styled.div`
  top: 0;
  width: 100%;
`
function Me(){
  return <h3>,here</h3>
}


@connect( 
  state => state,
  { getMsgList, recvMsg}
)

class Dashboard extends React.Component{
  componentDidMount(){
    // 进入dashboard 就获取列表信息
    // 以及开始监听 接受的信息
    // bug: 初次进入就会有三个的bug? 触发三次recvvMsg()
    // 而且yan发了 boss没有反映;
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList();
      this.props.recvMsg();
    }

  }
  render(){
    const pathname = this.props.location.pathname
    const userState = this.props.user
    // console.log("进入到disaborad寻找this.props")
    // console.log(this.props);
    // console.log("我们看看this.props.user")
    // console.log(this.props.user);
    // console.log(`type是 ${userState.type}`)
    // console.log(userState.type)
    // console.log(userState.type === 'genius')
    // console.log(userState.type === 'boss')
    const navList = [{
      path: '/boss',
      text: '找搬砖',
      iocn: 'boss',
      title: '大佬圈',
      component: Boss,
      hide: userState.type === 'genius'
    },{
      path: '/genius',
      text: '大佬',
      iocn: 'job',
      title: '搬砖队友',
      component: Genius,
      hide: userState.type === 'boss'
    },{
      path: '/msg',
      text: '消息列表',
      iocn: 'msg',
      title: '消息列表',
      component: Msg
    },{
      path: '/me',
      text: '我',
      iocn: 'userState',
      title: '个人中心',
      component: User
    }]
    // find 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    const NavItem = navList.find(v=>v.path === pathname);
    return (
      <div>
        {/* NavBar 只显示过滤掉的名称 */}
        {/* <Mheader> */}
        <div className='fixheader'>
          <NavBar mode='dark'>{ NavItem ? NavItem.title:''}</NavBar>
        </div>
        {/* </Mheader> */}
        <div>
          <Switch>
            {navList.map(v=>(
              <Route key={v.text} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard