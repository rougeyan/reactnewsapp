import React from 'react'
import { Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatatSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired 
  }
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  render(){
    const avatarlist = 'boy,boy2,boy3,boy4,boy5,boy6,boy7,boy8,boy9,boy10,boy11,boy12,boy12'.split(',').map(v=>({
      // icon:require('../logo/`${v}.jpg') // 假如是一个变量
      icon:require('../logo/logo.jpg'),
      text: v
    }))
    const gridHeader = this.state.text ? (<div>
                                            <span>已选择头像</span>
                                            <img style={{width:20}} src={this.state.icon} alt='' />
                                            <span>头像名称{this.state.text}</span>
                                          </div>) : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarlist} columnNum={5} onClick={elm=>{
            // 这里就是父子间通讯
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}></Grid>
        </List>
      </div>
    )
  }
}
export default AvatatSelector