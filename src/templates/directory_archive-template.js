import React from "react"
import { graphql, navigate } from "gatsby"

import ArchiveTemplate from './archive_template'

export const query = graphql`
    query($regex: String!, $directory: String!, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {
          frontmatter: { draft: {ne: true}},
          fields: {directory: {regex: $regex}}},
        skip: $skip, limit: $limit) {
        nodes { 
          ...postFields
        }
      }
      aksDirectory(name: { eq: $directory }) {
        id, name, label, fullLabel, pagePath
      }
    }
  `

  const handleChange = (path, p) => {
    navigate((p === 1) ? path : `${path}/${p}`)
  }
  
export default function DirectoryArchiveTemplate({ data, pageContext }) {
  const { breadcrumb: { crumbs } } = pageContext
  //const { previousPagePath, nextPagePath } = pageContext
  
  //const label = crumbs.slice(1).map(v => v.crumbLabel).join('/')
  const label = data.aksDirectory.fullLabel
  const title = `DIRECTORY: ${label}`

  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(data.aksDirectory.pagePath, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters} />)
}
