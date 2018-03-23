import React from 'react';
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

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
    console.log(this.props);
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
    return <UserCard userlist={this.props.userList}></UserCard>
  }
}

export default Boss