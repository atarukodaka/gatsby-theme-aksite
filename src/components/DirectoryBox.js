import React from "react"
import { Link } from "gatsby"
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

import directoryLabel from '../utils/directory_label'
import theme from '../styles/theme'

/*
const cssDirectoryBox = css`
    display: inline-block;
    background-color: #cdd;
    a {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        text-decoration: none;
    }
    &:hover {
        background-color: #eff;
    }
`
*/

const cssDirectoryBox = css`
    display: inline-block;
    background-color: ${theme.palette.action.hover};
        
    a {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        text-decoration: none;
        color: ${theme.palette.text.primary};
    }
    &:hover {
        background-color: ${theme.palette.action.active};
    }
`

const DirectoryBox = ({ directory, ...props }) => (
    <div css={cssDirectoryBox} {...props}>
        <Link to={'/' + directory}>
            {directoryLabel(directory)}
        </Link>
    </div>

)

DirectoryBox.prototype = {
    directory: PropTypes.string.isRequired
}

export default DirectoryBox