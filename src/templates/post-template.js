import React from "react"
import { graphql } from "gatsby"
import Breadcrumb from '../components/Breadcrumb'

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

export default function PostTemplate({ data, pageContext }) {
  console.log(`create/template: ${data.mdx.fields.slug}`)
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext

  const title = node.fields.postTitle || node.frontmatter.title
  const description = node.frontmatter.description || node.excerpt
  const cover = node.frontmatter.cover?.publicURL

  return (
    <Layout tableOfContents={node.tableOfContents} >
      <SEO title={title} description={description} cover={cover} />
      <Breadcrumb crumbs={crumbs} crumbLabel={title} />

      <Post node={node}/>      
      <nav>        
        <PrevNextPost node={node}/>
        <h3>Relevant Posts</h3>
        <RelevantPosts node={node}/>
      </nav>
    </Layout>
  )
}
