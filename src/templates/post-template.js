import React from "react"
import { graphql, Link } from "gatsby"
//import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Breadcrumb from '../components/Breadcrumb'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import Layout from "../components/Layout"
import Post from "../components/Post"
import SEO from '../components/SEO'
import HoverBox from '../components/HoverBox'
import Card from '../components/Card'
import PostCard from '../components/PostCard'

export const query = graphql`
    query ($slug: String!) {
      mdx(fields: { slug: { eq: $slug }}){
        ...postFieldsBody
               
      }

      allMdx(sort: {fields: frontmatter___date, order: ASC}) {
        nodes {
          ...postFields
        }
      }
    }

`

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

export default function PostTemplate({ data, pageContext }) {
  console.log(`create/template: ${data.mdx.fields.slug}`)
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext

  const title = node.fields.postTitle || node.frontmatter.title
  const description = node.frontmatter.description || node.excerpt
  const cover = node.frontmatter.cover?.publicURL
  const index = data.allMdx.nodes.map(v => v.id).indexOf(node.id)
  const prevPost = (index > 0) ? data.allMdx.nodes[index - 1] : null
  const nextPost = (index < data.allMdx.nodes.length) ? data.allMdx.nodes[index + 1] : null
  const siblings = data.allMdx.nodes.filter(v =>
    (v.id !== node.id) && (v.fields.directory === node.fields.directory))

  return (
    <Layout tableOfContents={node.tableOfContents} >
      <SEO title={title} description={description} cover={cover} />

      <Breadcrumb crumbs={crumbs} crumbLabel={title} />

      <Post node={node} siblings={siblings}
        prevPost={prevPost} nextPost={nextPost} />

      <nav>
        <PrevNextPost prevPost={prevPost} nextPost={nextPost} />
        <Divider />
        {siblings && (<>
          <Typography variant="h3">Siblings on '{node.fields.directoryLabel}'</Typography>
          <Siblings nodes={siblings} />
        </>)}
      </nav>
    </Layout>
  )
}
