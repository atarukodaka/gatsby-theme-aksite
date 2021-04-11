import React from "react"
//const path = require('path')
import { graphql } from "gatsby"

import { ogImagePath } from 'gatsby-plugin-aks-og-images'

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
  //const cover = node.frontmatter.cover?.publicURL
  const crumbLabel = (isRoot) ? null : node.fields.postTitle

  //console
  //const image = node.frontmatter.cover?.publicURL || (isRoot) ? null : `og-pages/${node.id}/cover.png`
  const image = node.frontmatter.cover?.publicURL  || ((isRoot) ? null : ogImagePath(node.id))
  //console.log("cover image", node.frontmatter.cover)
  //const image = node.frontmatter.cover?.publicURL || ogImage(node.id)
  return (
    <Layout tableOfContents={node.tableOfContents} >
      
      <SEO title={title} description={description} image={image} isRoot={isRoot}/>
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
