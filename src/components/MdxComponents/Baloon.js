import React from 'react'
import { css } from '@emotion/react'


const cssBaloon1 = css`

position: relative;
display: inline-block;
margin: 1.5em 0 1.5em 15px;
padding: 7px 10px;
min-width: 120px;
max-width: 100%;
color: #555;
font-size: 16px;
background: #e0edff;
padding: 1rem;
  &:before{
    content: "";
    position: absolute;
    top: 50%;
    left: -30px;
    
    margin-top: -15px;
    border: 15px solid transparent;
    border-right: 15px solid #e0edff;;
  }
`

const Baloon = ({ children, tail = "left" }) => {
  return (
    <>
      <div css={cssBaloon1}>
        {children}
      </div>
    </>
  )
}

export default Baloon