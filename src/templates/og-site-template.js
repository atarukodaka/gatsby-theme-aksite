import { graphql} from 'gatsby'
import React from 'react'
//const url = require('url')

export const query = graphql`
{
    site {
        siteMetadata {
            title, author, siteUrl
        }
    }
}
`

const OgSiteTemplate = ( { data }) => {
    const { title, author, siteUrl } = data.site.siteMetadata
    const domain = new URL(siteUrl).hostname
    //console.log("domain", domain)
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
            <h1>{title}</h1>
            <h3>{author}</h3>
            <h3>{domain}</h3>
        </div>
    )
}

export default OgSiteTemplate
