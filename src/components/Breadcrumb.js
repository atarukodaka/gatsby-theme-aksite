import React from 'react'
import { Breadcrumb as BreadcrumbOriginal } from 'gatsby-plugin-breadcrumb'
import { css } from '@emotion/react'
import theme from '../styles/theme'

const cssBreadcrumb = css`
    a {
      text-decoration: none;
      color: ${theme.palette.text.primary};
      &:hover {
          background-color: ${theme.palette.action.hover};
      }
    }
    nav {
        font-size: small;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        /* margin-top: 1em; */
    }
    
`

const Breadcrumb = ( props ) => (
    <div css={cssBreadcrumb}>
        <BreadcrumbOriginal {...props} />
    </div>
)

export default Breadcrumb