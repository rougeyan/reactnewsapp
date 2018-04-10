import React from 'react'
import {connect} from 'react-redux'
import {List, Badge}from 'antd-mobile'


@connect(state=>state)
class Msg extends React.Component{
  getLast(arr){
    //返回最后一个
    return arr[arr.length -1]
  }
  render(){
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users
    // 根据chatid 按照聊天用户分组;
    const msgGroup = {};
    console.log(this.props.chat.chatmsg)
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    console.log(msgGroup);
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a);
      const b_last = this.getLast(b);
      return b_last - a_last;
    })
    // object.values 用法:
    // object.values({name:'xiaoming',age:18}) => ['xiaoming', 18] 取值不取key;
    

    return (
      <div>
          {chatList.map(v=>{
            // 获取最后一条信息
            const lastItem = this.getLast(v);
            // 这里判断这个用户名 与当前状态的用户名
            const targetId = v[0].from == userid ? v[0].to : v[0].from;
            // 是传送过来的并且id跟当且id相符合;
            const unreadNum = v.filter(v => !v.read && v.to == userid).length;
            if(!userinfo[targetId]){
              return null
            }
            // const name = userinfo[targetId] ? userinfo[targetId].name  : ''
            // const avatar = userinfo[targetId] ? userinfo[targetId].avatar  : ''
            console.log(targetId)
            return (
              <List key={lastItem._id}>
                <Item
                      extra = {<Badge text={unreadNum}></Badge>}
                      thumb = {require('../logo/logo.jpg')}
                      // thumb = {require(`../img/${userinfo[targetId].avatar}.pbg`)}
                      arrow ="horizontal"
                      onClick={()=>{
                        this.props.history.push(`/chat/${targetId}`) 
                      }}
                >
                  {lastItem.content}
                  <Brief>{userinfo[targetId].name}</Brief>
                </Item>
              </List>
            )
          })}
        
      </div>
    )
  }
}
export default Msg