import React from "react"
import { graphql, navigate } from "gatsby"

import { listArchivePath } from '../utils/archive_path'
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
  const { humanPageNumber, numberOfPages } = pageContext;
  console.log("listarchive contenxt", pageContext)
  const { breadcrumb: { crumbs } } = pageContext

  const handleChange = (_event, p) => {
    navigate(`${listArchivePath()}/${p}`)
  }
  const title = "Latest Articles" + ((humanPageNumber > 1) ? ` -  page ${humanPageNumber}` : '')
  const pagination_parameters = {
    numberOfPages: numberOfPages,
    humanPageNumber: humanPageNumber,
    onChangeHandler: handleChange
  }

  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters} />
  )
}
export default IndexTemplate

