import React from "react"
import { Link, navigate, useStaticQuery } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Chip from '@material-ui/core/Chip'

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import CoverImage from './CoverImage'
import PageTitle from './PageTitle'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { tagArchivePath } from '../utils/archive_path'

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

const clickHandler = (tag) => {
    //alert(tag)
    navigate(tagArchivePath(tag))
}
const Tags = ({node}) => {
    if (node.frontmatter.tags === null) { return null }

    return node.frontmatter.tags.map(tag => 
        (<Chip label={tag} color="primary" variant="outlined" onClick={() => {clickHandler(tag)}} />))
}
const Post = ({ node }) => {
    const { pathname } = useLocation()
    const { siteUrl } = useSiteMetadata()

    const query = graphql`
    {
        directories: allAksDirectory { 
            nodes {
                id, name, label, fullLabel, pagePath, numberOfPosts
            }
        }
    }
    `
    const data = useStaticQuery(query)
    const dir_node = data.directories.nodes.find(v=>v.name === node.fields.directory)
    
    console.log("directory node", dir_node)
    //const { label, fullLabel, pagePath } = directory_node
    return (
        <div css={cssPost}>
            <Header>
                <div>
                    {node.frontmatter.date}
                    {(dir_node) ? 
                        (<DirectoryBox><Link to={dir_node.pagePath}>{dir_node.fullLabel}</Link></DirectoryBox>)
                        : null}
                </div>
                <PageTitle><Link to={node.fields.slug}>{node.fields.postTitle}</Link></PageTitle>
                <Tags node={node}/>
                <CoverImage node={node} />
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
