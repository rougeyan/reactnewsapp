import React from 'react'
import { Button ,WingBlank} from 'antd-mobile'
import { withRouter }from 'react-router-dom'
import styled from 'styled-components'


const Redp = styled.p`
  font-size:16px;
  color: red;
  border: 1px solid purple;
`
const Pitlep = styled.p`
  font-size:20px;
  text-align:center;
  border: 1px solid purple;
`
@withRouter
class Explain extends React.Component{
  render(){
    return(
        <div>
        <WingBlank>
          <Redp>可能聊天过程中反映比较慢,毕竟数据库,node端都是同一个渣渣vps</Redp>
          <Redp>还要是海外的VPS 所以响应比较慢,见谅</Redp>
          <Pitlep>使用说明:</Pitlep>
          <p>这是一个实时通讯的webapp</p>
          <p>打开两个浏览器,其中进入隐身模式(这样才没有cookie)</p>
          <p>分别输入登陆:</p>
            <p>帐号:zhazha1,密码:123</p>
            <p>帐号:boss1,密码:123</p>
          <p>恭喜你,你就可以进行愉快的事实聊天拉</p>
          <WingBlank>
            <Button type="primary" onClick={()=>{
              this.props.history.push('/login')
            }}>返回登陆页</Button>
          </WingBlank>
        </WingBlank>
        </div>
      )
  }
}
export default Explain