import React from 'react'
import { graphql } from 'gatsby'
//const url = require('url')

export const query =  graphql`
    query($id: String!){
        mdx(id: {eq: $id}){
            id
            frontmatter {
                title, date(formatString: "YYYY-MM-DD"), description
            }
            excerpt
        }
        site {
            siteMetadata {
                siteUrl
            }
        }

    }
`

const OgTemplate = ({data}) => {
    const node = data.mdx
    const domain = new URL(data.site.siteMetadata.siteUrl).hostname
    return (
        <div style={{margin: "3rem"}}>
            <style global>{`
                body {
                    background-color: #227;
                    color: white;
                }
            `
            }
            </style>
            <h1>{node.frontmatter.title}</h1>
            <h3>{node.frontmatter.date}</h3>
            <div>{node.description || node.excerpt } </div>
            <div style={{color: "#ccc", marginTop: "1rem"}}>{domain}</div>
        </div>
    )
}

export default OgTemplate
