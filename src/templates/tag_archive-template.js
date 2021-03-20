import React from "react"
import { graphql, navigate } from "gatsby"
import ArchiveTemplate from './archive_template'

export const query = graphql`
    query($tag: String!, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {
          frontmatter: { draft: {ne: true}, tags: { in: [$tag] }}
        },
        skip: $skip, limit: $limit) {
        nodes { 
          ...postFields
        }
      }
    }
  `
const handleChange = (pagePath, tag, p) => {
    const path = `${pagePath}/${tag}/${p}`
    navigate((p === 1) ? path : `${path}/${p}`)
}

export default function TagArchiveTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { pagePath, breadcrumb: { crumbs } } = pageContext
  const title = `TAG: ${tag}`

  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(pagePath, tag, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters} />)


}
