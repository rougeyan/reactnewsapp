import React from 'react'
import { NavBar, InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../conpoments/avatarselector/avatarselector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { update } from '../../redux/user.redux'
@connect(
  state => state.user,
  {update}
)

class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '' ,
      desc: '',
      avatar: ''
    }
    this.selectAvatar = this.selectAvatar.bind(this);
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  selectAvatar(image){
    console.log(image)
    this.setState({
      avatar:image
    })
  }
  render(){
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {/* 验证路由的跳转是否正确 */}
        {(redirect && redirect !== path)? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark" >完善老板信息</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>公司名次</InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>薪酬</InputItem>
        <TextareaItem onChange={(v)=>this.onChange('desc',v)} rows={3} autoHeight title='职位要求'></TextareaItem>
        <Button onClick={()=>{this.props.update(this.state)}} type="primary">保存</Button>
      </div>
    )
  }
}
export default BossInfo