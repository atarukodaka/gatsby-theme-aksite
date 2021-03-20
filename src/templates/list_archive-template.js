import React from "react"
import { graphql, navigate } from "gatsby"

import ArchiveTemplate from './archive_template'

export const data = graphql`
  query ($skip: Int!, $limit: Int!){
    allMdx (filter: {frontmatter: {draft: {ne: true} } },
      sort: {fields: frontmatter___date, order: DESC},

      skip: $skip, limit: $limit){
      nodes {
        ...postFieldsBody
      }
    }
  }
`

const IndexTemplate = ({ data, pageContext }) => {
  const { humanPageNumber, numberOfPages,  } = pageContext;
  console.log("listarchive contenxt", pageContext)
  const { pagePath, breadcrumb: { crumbs } } = pageContext

  const handleChange = (path, p) => {
    navigate((p === 1) ? path : `${path}/${p}`)
  }
  const title = "Latest Articles" + ((humanPageNumber > 1) ? ` -  page ${humanPageNumber}` : '')
  const pagination_parameters = {
    numberOfPages: numberOfPages,
    humanPageNumber: humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(pagePath, p) }
  }

  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters} />
  )
}
export default IndexTemplate

