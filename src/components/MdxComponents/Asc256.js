import React from 'react'
import { css } from '@emotion/react'
//import Box from '@material-ui/core/Box'

const Asc256 = ( {children} ) => {
    const cssAsc = css`
        margin: 2rem;
        font-size: 2.2rem;
        font-weight: 800;
        text-align: center;
    `
    
    return (
        <div css={cssAsc}>
            {children}
        </div>
        )
}
export default Asc256
