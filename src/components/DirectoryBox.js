import React from "react"
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import theme from '../styles/theme'

const cssDirectoryBox = css`
    display: inline-block;
    background-color: ${theme.palette.action.hover};
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    
    a {
        text-decoration: none;
        color: ${theme.palette.text.primary};

        &:hover {
            background-color: ${theme.palette.action.active};
        }
    }

`

const DirectoryBox = ({ node, children, ...rest }) => (
    <div css={cssDirectoryBox} {...rest}>
        <Typography variant="caption">
            {children}
        </Typography>
    </div>
)

DirectoryBox.prototype = {
    directory: PropTypes.string.isRequired,
}

export default DirectoryBox