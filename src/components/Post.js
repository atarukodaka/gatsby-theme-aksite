import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
//import Chip from '@material-ui/core/Chip'

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import CoverImage from './CoverImage'
import PageTitle from './PageTitle'
import useSiteMetadata from '../hooks/useSiteMetadata'
//import { tagArchivePath } from '../utils/archive_path'

const Description = styled.div`
    padding: 1rem;  
`
const Header = styled.header`
    box-shadow: 0px 1px rgb(0 0 0 / 10%)
`
const Main = styled.main`
    margin-top: 1rem;
    padding-bottom: 1rem;
    
`
const Footer = styled.footer`
    border-top: solid 1px;
    padding-top: 1rem;
`
const cssPost = css`
    margin-top: 2em;
    margin-bottom: 2em;
`
const cssCoverImage = css`
    .gatsby-image-wrapper {
        width: 100%;
        height: 300px;
    }
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

/*
const clickHandler = (tag) => {
    //alert(tag)
    navigate(tagArchivePath(tag))
}
const Tags = ({node}) => {
    if (node.frontmatter.tags === null) { return null }

    return node.frontmatter.tags.map(tag => 
        (<Chip label={tag} color="primary" variant="outlined" onClick={() => {clickHandler(tag)}} />))
}
*/
const Post = ({ node }) => {
    const { pathname } = useLocation()
    const { siteUrl } = useSiteMetadata()
    //console.log("path: ", node.fields.path)

    //<DirectoryBox directory={node.fields.directory} enableLink={true}/>
    return (
        <div css={cssPost}>
            <Header>
                <div>
                    <span>{node.frontmatter.date}</span>
                    <DirectoryBox directory={node.fields.directory} enableLink={true}/>
                </div>
                <PageTitle><Link to={node.fields.path}>{node.fields.postTitle}</Link></PageTitle>
                { /* <Tags node={node}/> */ }
                <CoverImage node={node} css={cssCoverImage}/>
                <Description>{node.frontmatter.description}</Description>
            </Header>
            <Main>
                <RenderMDX>
                    {node.body}
                </RenderMDX>
            </Main>
            <Footer>
                <ShareSNS url={`${siteUrl}${pathname}`} title={node.fields.postTitle} />
            </Footer>
        </div>
    )
}

export default Post
