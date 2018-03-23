import React from 'react'
export default function LowHOC(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state ={};
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,val){
      console.log(key, val)
      this.setState({
        [key]:val
      })
    }
    render(){
      // 属性代理 加入属性
      return (<Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>)
    }
  }
}