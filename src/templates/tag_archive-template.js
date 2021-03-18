import React from "react"
import { graphql, navigate } from "gatsby"
//import { directoryArchivePath } from '../utils/archive_path'
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
const handleChange = (tag, p) => {
  //const path = directoryArchivePath(directory)
    const path = `/tag/${tag}/${p}`
  navigate((p === 1) ? path : `${path}/${p}`)
}

export default function TagArchiveTemplate({ data, pageContext }) {
  const { directory } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const label = crumbs.slice(1).map(v => v.crumbLabel).pop()
  const title = `TAG: ${label}`

  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(directory, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters} />)


}
