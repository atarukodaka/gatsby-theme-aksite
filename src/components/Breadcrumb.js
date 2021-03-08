import React from 'react'
import { Breadcrumb as BreadcrumbOriginal } from 'gatsby-plugin-breadcrumb'
import { css } from '@emotion/react'
import theme from '../styles/theme'

const cssBreadcrumb = css`
    a {
      text-decoration: none;
      color: ${theme.palette.text.primary};
    }
`
const Breadcrumb = ( props ) => (
    <div css={cssBreadcrumb}>
        <BreadcrumbOriginal {...props} />
    </div>
)

export default Breadcrumb