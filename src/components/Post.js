import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import CoverImage from './CoverImage'
import PageTitle from './PageTitle'
import useSiteMetadata from '../hooks/useSiteMetadata'


const Description = styled.div`
    padding: 1rem;  
`
const Header = styled.header`
    box-shadow: 0px 1px rgb(0 0 0 / 10%)
`
const Main = styled.main`
    margin-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 1rem; 
`
const Footer = styled.footer`
    border-top: solid 1px;
    padding-top: 1rem;
`
const cssPost = css`
    margin-top: 2em;
    margin-bottom: 2em;
`

const RenderMDX = ({ children }) => {
    return (
        <MDXProvider components={MdxComponents}>
            <MDXRenderer>
                {children}
            </MDXRenderer>
        </MDXProvider>
    )
}

const Post = ({ node, siblings, prevPost, nextPost }) => {
    const { pathname } = useLocation()
    const { siteUrl } = useSiteMetadata()

    return (
        <div css={cssPost}>
            <Header>
                <div>{node.frontmatter.date}</div>
                <PageTitle><Link to={node.fields.slug}>{node.fields.postTitle}</Link></PageTitle>
                <DirectoryBox><Link to={'/' + node.fields.dierctory}>{node.fields.directoryLabel}</Link></DirectoryBox>
                <CoverImage node={node} />
                <Description>{node.frontmatter.description}</Description>
            </Header>
            <Main>
                <RenderMDX>
                    {node.body}
                </RenderMDX>
            </Main>
            <Footer>
                <ShareSNS url={`${siteUrl}${pathname}`}
                    title={node.fields.postTitle} />

            </Footer>
        </div>
    )
}

export default Post
