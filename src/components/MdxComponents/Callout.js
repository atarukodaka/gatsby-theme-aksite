import React from 'react'
import Box from '@material-ui/core/Box'
import { css } from '@emotion/react'

import theme from '../../styles/theme'

const Callout = ( {variant="info", children} ) => {
    const variants = {
        info: {
            fontSize: "1.1rem",
            padding: "0.1rem"
        },
        shout: {
            boxShadow: 1,
            margin: 2,
            borderRadious: 8,
            textAlign: "center",
            fontSize: "1.5rem",
            padding: "1rem"
        }
    }
    
    return (
    <Box boxShadow={1} my={2} borderRadius={8} fontWeight={"bold"}
        {...variants[variant]}
        >{children}</Box>
    )
}
export default Callout
