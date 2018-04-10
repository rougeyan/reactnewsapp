import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid, WhiteSpace} from 'antd-mobile'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';
import { getChatId } from '../../util'

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
      text:'',
      shouldEmoj: false
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
    // 判断 这个状态chatmsg的长度 才去获取;
    if(!this.props.chat.chatmsg.length){
      console.log(this.props);
      this.props.recvMsg();
      this.props.getMsgList();
    }
    // 修正错位
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  fixCarousel(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  render(){
    const StickFooter = styled.div`
      /* z-index :10; */
      /* position:fixed; */
      /* bottom: 0; */
      /* width: 100%; */
    `
    const ItemRight = styled.div`
      text-align: right;
    `
    //路由过来的user
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    // 当前拼接的
    const chatidd = getChatId(userid, this.props.user._id)
    // 状态中拿到的
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatidd)
    // console.log(chatmsgs);
    // 从状态中找, 找不到不渲染
    if(!users[userid]){
      return null;
    }

    // 定义表情表 //因为没有表情直接拿文字代替;
    const emoj = 'emoj1,emoj2,emoj3,emoj4,emoj5,emoj6,emoj7,emoj8,,emoj9,emoj10,emoj11,emoj12,emoj13'.split(',').filter(v=>v).map(v=>({text:v,icon:require('../logo/logo.jpg')}))
                                                                      // 假如是返回一行直接 .map(v=>{text:v,icon:require('../logo/logo.jpg')})
                                                                      // 多行返回 需要 带一个括号?
    
    return(
      <div id='chat-page'>
        <NavBar className='Navb'
                mode='dark'
                icon={<Icon type="left"/>}
                onLeftClick ={()=>{
                  console.log(this.props);
                  this.props.history.goBack();
                }}
        >{`与${users[userid].name}聊天中`}</NavBar>

        {/* <StickFooter> */}
        <div  className='page-content'>
        {chatmsgs.map(v=>{
            const avatar = require('../logo/logo.jpg')
            // 判断是对方
            return v.from == userid 
            ? (<List><Item thumb={avatar}>{v.content}</Item></List>) 
            : (<List><Item className='chat-me' extra={<img src={avatar}/>}><ItemRight>{v.content}</ItemRight></Item></List>)
          })}
        </div>

          <div  className="stick-footer">
          <List>
            <InputItem  placeholder='请输入'
                        value={this.state.text.toString()}
                        onChange={(v)=>{
                          this.setState({text:v})
                        }}
                        extra={
                          <div>
                            <span style={{marginRight:15}} onClick={()=>{
                                  this.setState({
                                    shouldEmoj: !this.state.shouldEmoj
                                  })
                                  this.fixCarousel()
                            }}>表情</span>
                            <span onClick={()=>this.handleSubmit()}>发送</span>
                          </div>}></InputItem>
            {this.state.shouldEmoj?(<Grid data={emoj}
                  columnNum={6}
                  carouselMaxRow={1}
                  isCarousel={true}
            ></Grid>):null}
          </List>
          </div>
        {/* </StickFooter> */}
      </div>
    )
  }
}
export default Chat