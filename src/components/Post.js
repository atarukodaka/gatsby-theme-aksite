import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
//import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
//import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
// import * as styles from "./post.module.css"
import CoverImage from './CoverImage'
//import directoryLabel from '../utils/directory_label'
import PostCard from './PostCard'
//import postTitle from './postTitle'
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
    /* padding-bottom: 1em; */
    /* padding-right: 1em; */
    /* background-color:white; */
    /* box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);  */
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%)
//`

const RenderMDX = ({ children }) => {
    //const shortcodes = {Image, PostLink}
    return (
        <MDXProvider components={MdxComponents}>
            <MDXRenderer>
                {children}
            </MDXRenderer>
        </MDXProvider>
    )
}
const Siblings = ({ nodes }) => (
    <nav>
        <Grid container spacing={3}>
            {nodes.slice(0, 9).map(v =>
                (<Grid item xs={12} sm={6} key={v.id}><PostCard node={v} /></Grid>))
            }
        </Grid>
    </nav>
)

const PrevNextPost = ({ prevPost, nextPost }) => (
    <nav style={{ marginBottom: "2rem" }}>
        <Grid container>
            <Grid item sm={4}>
                <Typography variant="h4" style={{ textAlign: "left" }}>
                    《 PREV POST
                </Typography>
                {prevPost && (<PostCard node={prevPost} />)}
            </Grid>
            <Grid item sm={4} />
            <Grid item sm={4}>
                <Typography variant="h4" style={{ textAlign: "right" }}>NEXT POST》</Typography>
                {nextPost && (<PostCard node={nextPost} />)}
            </Grid>
        </Grid>
    </nav>
)

const Post = ({ node, siblings, prevPost, nextPost }) => {
    const { pathname } = useLocation()
    const { siteUrl } = useSiteMetadata()

    return (
        <div css={cssPost}>
            <Header>
                <div>{node.frontmatter.date}</div>
                <PageTitle>{node.fields.postTitle}</PageTitle>
                <DirectoryBox node={node}/>
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
                    title={node.fields.postTitle}/>
                <PrevNextPost prevPost={prevPost} nextPost={nextPost} />
                <Divider />
                <Typography variant="h3">Siblings on '{node.fields.directoryLabel}'</Typography>
                <Siblings nodes={siblings} />
            </Footer>
        </div>
    )
}

export default Post
