import React from 'react';
import axios from 'axios';
import { Card, WhiteSpace, WingBlank }from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'


import { connect } from 'react-redux'
@connect(
  state =>state.chatuser,
  { getUserList }
)
class Boss extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    this.props.getUserList('genius')
    // 本来是属于组件渲染改变组件内部
    // 但是为了方便状态管理, 设置为react-redux 管理;
    
    // axios.get('/user/list?type=genius')
    //   .then(res=>{
    //     if(res.data.code === 0 ){
    //       this.setState({
    //         data:res.data.data
    //       })
    //     }
    //   })
  }
  render(){
    console.log(this.props);
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v=>(v.avatar?
          <Card>
            <Header extra={<span>{`求职是:${v.title}`}</span>} key={v.user} title={'name:' + v.user} thumb={(<img style={{width:40} }src={require('../logo/logo.jpg')}/>)}/>
            {/* typeof [] //object 妈的空数组的类型一个obj 不能这样 v.desc.split('\n')为空 直接返回 如果不是 则返回一系列 */}
            {/* v.desc.split('\n')? v.desc.split('\n') : v.desc.split('\n').map(fuc)*/}
            <Body>{v.desc.split('\n').map(t=>(<p key={t}>{t}</p>))}</Body>
          </Card>: null 
        ))}
      </WingBlank>
    )
  }
}

export default Boss