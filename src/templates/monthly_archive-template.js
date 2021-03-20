import React from "react"
import { graphql, navigate } from "gatsby"

import ArchiveTemplate from './archive_template'

export const query = graphql`
      query($fromDate: Date!, $toDate: Date!, $skip: Int!, $limit: Int!,
        $year: Int!, $month: Int!
        ){        
      allMdx(
        sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { 
          date: { gte: $fromDate, lt: $toDate },
          draft: {ne: true}
         }},
        skip: $skip, limit: $limit) {
        nodes { 
          ...postFields
        } 
      }
      aksMonthly(year: {eq: $year}, month: {eq: $month}) {
        id, year, month, yearMonth, pagePath
      }
    }
  `
const handleChange = (path, p) => {
  navigate((p === 1) ? path : `${path}/${p}`)
}

export default function MonthlyArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const title = `MONTHLY ARCHIVE: ${year}/${month}`
  //console.log(title)
  

  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(data.aksMonthly.pagePath, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters}/>)
    

}

