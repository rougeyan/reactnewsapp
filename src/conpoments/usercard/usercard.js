import React from 'react'

import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank }from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userlist : PropTypes.array.isRequired
  }
  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank className='page-content2'>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>(v.avatar ?
          <Card 
            key={v._id + new Date().getTime()}
            onClick={()=>this.handleClick(v)}
          >
            <Header extra={<span>{`求职是:${v.title}`}</span>} key={v.user} title={'name:' + v.user} thumb={(<img style={{width:40} }src={require('../logo/logo.jpg')}/>)}/>
            {/* typeof [] //object 妈的空数组的类型一个obj 不能这样 v.desc.split('\n')为空 直接返回 如果不是 则返回一系列 */}
            {/* v.desc.split('\n')? v.desc.split('\n') : v.desc.split('\n').map(fuc)*/}
            <Body>{v.desc.split('\n').map(t=>(<p key={t+new Date().getTime()+Math.random()}>{t}</p>))}
                  {v.type === 'boss'?(<div>薪酬:{v.money}</div>) : null}
            </Body>
          </Card>: null 
        ))}
      </WingBlank>
    )
  }
}
export default UserCard