import React from 'react'
import styled from 'styled-components'
import logoPic from './logo.jpg'

const LogoWrap = styled.div`
  margin-top: 20px;
  text-align: center; 
  /* 给图片居中 */
  margin-bottom: 20px;
  img{
    width: 50%;
    height: 50%;
  }
`

function Logo (){
    return (
        <LogoWrap>  
          <img src={logoPic} alt='' />
        </LogoWrap>
    )
} 

export default Logo
