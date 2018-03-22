import React from 'react'

import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank }from 'antd-mobile'

class UserCard extends React.Component{
  static propTypes = {
    userlist : PropTypes.array.isRequired
  }
  render(){
    console.log(this.props);
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>(v.avatar?
          <Card>
            <Header extra={<span>{`求职是:${v.title}`}</span>} key={v.user} title={'name:' + v.user} thumb={(<img style={{width:40} }src={require('../logo/logo.jpg')}/>)}/>
            {/* typeof [] //object 妈的空数组的类型一个obj 不能这样 v.desc.split('\n')为空 直接返回 如果不是 则返回一系列 */}
            {/* v.desc.split('\n')? v.desc.split('\n') : v.desc.split('\n').map(fuc)*/}
            <Body>{v.desc.split('\n').map(t=>(<p key={t}>{t}</p>))}
                  {v.type === 'boss'?(<div>薪酬:{v.money}</div>) : null}
            </Body>
          </Card>: null 
        ))}
      </WingBlank>
    )
  }
}
export default UserCard