import { graphql } from 'gatsby'

console.log("fragments.js loaded")

export const postFields = graphql`
fragment postFields on Mdx {
  id
  excerpt(pruneLength:300)
  frontmatter {
    date(formatString: "YYYY-MM-DD"), title, description, tags
    draft
    cover {
      publicURL
      childImageSharp {
        gatsbyImageData
      }
    }
    series {
      title
      number
    }
  }        
  fields { 
    slug, postTitle, path,
    directory, directoryLabel, directoryFullLabel
  }
  tableOfContents
}

fragment postFieldsBody on Mdx {
    ...postFields
    body
}

fragment siteInformation on Site {
    siteMetadata {
        title
        author
        description
        coverImage
        siteUrl
        social { twitter, github }
    }
}
`
