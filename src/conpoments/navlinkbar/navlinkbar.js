import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from 'styled-components'

const Mfooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`
@connect(
  state =>state.chat
)
@withRouter
class NavLinkBar extends React.Component{
  static propTypes ={
    data: PropTypes.array.isRequired
  }
  render(){
    // console.log(`渲染前获得这个${this.props.data}`)
    const navList = this.props.data.filter(v=>!v.hide)
    const {pathname} = this.props.location
    // console.log('开始渲染啦')
    return (
      <Mfooter>
        <TabBar>{
          navList.map(v=>(
            <TabBar.Item  badge={v.title === '消息列表'? this.props.unread:null}
                          title={v.text} 
                          key={v.path} 
                          icon={{uri: require('../logo/logo.jpg')}}
                          selectedIcon={{uri: require('../logo/logo.jpg')}}
                          selected={pathname === v.path}
                          onPress={()=>{
                            this.props.history.push(v.path)
                          }}
                          >
              </TabBar.Item>
          ))
        }</TabBar>
      </Mfooter>
    )
  }
}
export default NavLinkBar