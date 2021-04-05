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

export default function PostTemplate({ data, pageContext, location }) {
  console.log(`create/template: ${data.mdx.fields.slug}`)
  const node = data.mdx
  const { isRoot, breadcrumb: { crumbs } } = pageContext
  //console.log("crumb", crumbs)
  const title = node.fields.postTitle || node.frontmatter.title
  const description = node.frontmatter.description || node.excerpt
  const cover = node.frontmatter.cover?.publicURL
  const crumbLabel = (isRoot) ? null : node.fields.postTitle

  //console.log("cover url", node.frontmatter.cover)

  return (
    <Layout tableOfContents={node.tableOfContents} >
      
      <SEO title={title} description={description} cover={cover} isRoot={isRoot}/>
      <Breadcrumb crumbs={crumbs} crumbLabel={crumbLabel}/>

      <Post node={node}/>      
      <nav>        
        <PrevNextPost node={node}/>
        <h3>Relevant Posts</h3>
        <RelevantPosts node={node}/>
      </nav>
    </Layout>
  )
}
