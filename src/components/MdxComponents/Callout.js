import React from 'react'
import Box from '@material-ui/core/Box'

const Callout = ( {variant="shout", children} ) => {
    const variants = {
        info: {
            fontSize: "1.1rem",
            padding: "0.5rem"
        },
        shout: {
            boxShadow: 1,
            margin: 2,
            borderRadious: 8,
            textAlign: "center",
            fontSize: "1.2rem",
            padding: "1rem",
            bgcolor: "#ffffe0",
        }
    }
    
    return (
    <Box boxShadow={1} my={2} borderRadius={8} fontWeight={"bold"}
        {...variants[variant]}
        >{children}</Box>
    )
}
export default Callout
