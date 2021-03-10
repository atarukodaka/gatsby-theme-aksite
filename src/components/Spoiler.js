import React from 'react'
import Alert from '@material-ui/lab/Alert'


import theme from '../styles/theme'

const Spoiler = ({ children }) => {
    const color = theme.palette.background.default
    return (
        <>
            <Alert severity="warning"><strong>WARNING !!! SPOILER IS COMING !!!</strong></Alert>

            <div style={{ marginTop: "30rem", color: color }}>
                {children}
            </div>
        </>
    )
}

export default Spoiler