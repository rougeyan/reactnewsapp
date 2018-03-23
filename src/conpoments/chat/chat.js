import React from 'react'

class Chat extends React.Component{
  render(){
    return(
      <div>
        <h2>
          chat wit: user: {this.props.match.params.user}
        </h2>
      </div>
    )
  }
}
export default Chat