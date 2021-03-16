import React from "react"
import { graphql } from "gatsby"
import Breadcrumb from '../components/Breadcrumb'
import Divider from '@material-ui/core/Divider'

import Layout from "../components/Layout"
import Post from "../components/Post"
import SEO from '../components/SEO'
import PrevNextPost from '../components/PrevNextPost'
import RelevantPosts from '../components/RelevantPosts'

export const post_query = graphql`
    query ($slug: String!) {
      mdx(frontmatter: {draft: {ne: true} },
        fields: { slug: { eq: $slug }}){
        ...postFieldsBody
               
      }
    }

`
/*
const Siblings = ({ nodes }) => (
  <nav>
      <Grid container spacing={3}>
          {nodes.slice(0, 9).map(v =>
              (<Grid item xs={12} sm={12} key={v.id}><PostCard node={v} /></Grid>))
          }
      </Grid>
  </nav>
)
*/
export default function PostTemplate({ data, pageContext }) {
  console.log(`create/template: ${data.mdx.fields.slug}`)
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext

  const title = node.fields.postTitle || node.frontmatter.title
  const description = node.frontmatter.description || node.excerpt
  const cover = node.frontmatter.cover?.publicURL

  /*
  const siblings = data.allMdx.nodes.filter(v =>
    (v.id !== node.id) && (v.fields.directory === node.fields.directory))
*/
  return (
    <Layout tableOfContents={node.tableOfContents} >
      <SEO title={title} description={description} cover={cover} />
      <Breadcrumb crumbs={crumbs} crumbLabel={title} />

      <Post node={node}/>
      
      <nav>        
        { /* siblings && (<>
          <Typography variant="h3">Siblings on '{node.fields.directoryLabel}'</Typography>
          <Siblings nodes={siblings} />
        </>) */}
        <h3>Relevant Posts</h3>
        <RelevantPosts node={node}/>
        <PrevNextPost node={node}/>
      </nav>
    </Layout>
  )
}
