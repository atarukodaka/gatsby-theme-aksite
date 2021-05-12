import React from "react"
import { graphql, navigate } from "gatsby"

import ArchiveTemplate from './archive_template'


export const query = graphql`
    query($series: String!){
        allMdx(filter: {  frontmatter: { series: { title: { eq: $series } } } },
            sort:  {fields: frontmatter___date, order: ASC},
            ) {
            nodes {
                ...postFields
            }
        }
    }
`

const SeriesTemplate = ( { data, pageContext } ) => {
    const { breadcrumb: { crumbs } } = pageContext
    const title = pageContext.series

    return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}/>)
}

export default SeriesTemplate