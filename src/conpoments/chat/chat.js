import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar} from 'antd-mobile'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';


const socket = io('ws://localhost:3000');
@connect(
  state =>state,
  { getMsgList, sendMsg, recvMsg}  
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text:'',
      msglist:[]
    }
  }
  handleSubmit(){
    
    const from = this.props.user._id; //状态中登陆的user._id
    // 定义的时候在index中
    //<Route path='/chat/:user' component={Chat}></Route>
    // this.props.history.push(`/chat/${v._id}`) 这个点击时候获取的对象的._id
    const to = this.props.match.params.user; //路由跳转时带有的match.params.user
    const msg = this.state.text
    this.props.sendMsg({
      from,to,msg
    })
    this.setState({
      text:''
    })
    // socket.emit('sendmsg',{text:this.state.text});
    // this.setState({
    //   text: ''
    // })
  }
  componentDidMount(){
    //不跨域则io()  
    //const socket = io('ws://localhost:3000');
    // 错误 例子 这里要使用箭头函数 因为这里是一个回调函数?
    // socket.on('recvmsg',function(data){
    //   this.setState({
    //     msg:[...this.state.msglist, data.text]
    //   })
    // })
    
    // socket.on('recvmsg',(data)=>{
    //   this.setState({
    //     msg:[...this.state.msglist, data.text]
    //   })
    // })
    console.log(this.props);
    this.props.getMsgList();
    this.props.recvMsg();
  }
  
  render(){
    const StickFooter = styled.div`
      z-index :10;
      position:absolute;
      bottom: 0;
      width: 100%;
    `
    const ItemRight = styled.div`
      text-align: right;
    `
    const user = this.props.match.params.user;
    const Item = List.Item
    return(
      <div>
        <NavBar mode='dark'>{`与${user}聊天中`}</NavBar>
        <StickFooter>
          {/* {this.props.chat.chatmsg.map(v=>{
            // 判断是对方
            return v.from == user?
            <Item>对方:{v.content}</Item>:
            <Item
              extra="avatar"
            ><ItemRight>我:{v.content}</ItemRight></Item>
          })} */}
          <List>
            <InputItem  placeholder='请输入'
                        value={this.state.text.toString()}
                        onChange={(v)=>{
                          this.setState({text:v})
                        }}
                        extra={<span onClick={()=>this.handleSubmit()}>发送</span>}>信息
                        ></InputItem>
          </List>
        </StickFooter>
      </div>
    )
  }
}
export default Chat