import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import CoverImage from './CoverImage'
import PostCard from './PostCard'
import PageTitle from './PageTitle'
import useSiteMetadata from '../hooks/useSiteMetadata'
import HoverBox from './HoverBox'
import Card from './Card'

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
const Siblings = ({ nodes }) => (
    <nav>
        <Grid container spacing={3}>
            {nodes.slice(0, 9).map(v =>
                (<Grid item xs={12} sm={12} key={v.id}><PostCard node={v} /></Grid>))
            }
        </Grid>
    </nav>
)

const PrevNextPost = ({ prevPost, nextPost }) => (
    <nav style={{ marginBottom: "2rem" }}>
        <Grid container>
            <Grid item md={6} sm={12}>
                {prevPost && (<HoverBox><Card><Link to={prevPost.fields.slug}>《 {prevPost.fields.postTitle}</Link></Card></HoverBox>)}
            </Grid>
            <Grid item md={6} sm={12}>
                {nextPost && (<HoverBox ><Card><Link to={nextPost.fields.slug}>{nextPost.fields.postTitle} 》</Link></Card></HoverBox>)}
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
                <PageTitle><Link to={node.fields.slug}>{node.fields.postTitle}</Link></PageTitle>
                <DirectoryBox><Link to={'/'+node.fields.dierctory}>{node.fields.directoryLabel}</Link></DirectoryBox>
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
                { siblings && (<>
                <Typography variant="h3">Siblings on '{node.fields.directoryLabel}'</Typography>
                <Siblings nodes={siblings} />
                </>)}
            </Footer>
        </div>
    )
}

export default Post
