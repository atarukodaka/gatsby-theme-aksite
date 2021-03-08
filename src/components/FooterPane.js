import React from 'react'
import { css } from '@emotion/react'

import useSiteMetadata from '../hooks/useSiteMetadata'

const cssFooterPane = css`
    border-top: 2px solid #111;
    margin-top: 1em;
    padding: 1em;
`
const FooterPane = () => {
    const { author } = useSiteMetadata()
    const gatsbyUrl = 'https://www.gatsby.com/'
    const themeUrl = 'https://github.com/atarukodaka/gatsby-aksite-starter'
    const themeName = 'Ak Site Theme'

    return (
        <footer css={cssFooterPane}>
            (C) Copyright {(new Date()).getFullYear()} {author} All Right Reserved.
            Powered by <a href={gatsbyUrl}>Gatsby</a> and <a href={themeUrl}>{themeName}</a>.
        </footer>
    )
}

export default FooterPane