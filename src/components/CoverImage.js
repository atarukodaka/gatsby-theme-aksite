import React from 'react'
//import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'

/*
const CoverImage = ({ node, size = "regular", imageSize = "80px", ...props }) => {

    const cssWrapperSmall = css`
        width: ${imageSize};
        height: ${imageSize};
        float: left;
        background-color: #f2f2f2;

        .gatsby-image-wrapper {
            width: 100%;
            height: 100%;
        }
    `

    const cssWrapperWide = css`
        .gatsby-image-wrapper {
            width: 100%;
            height: 300px;
        }
    `

    //(<Img fluid={node.frontmatter.cover.childImageSharp.fluid} />)
    const cssWrapper = (size === "small") ? cssWrapperSmall : cssWrapperWide
    return (
        <div css={cssWrapper} {...props}>
            {node.frontmatter.cover &&
                (<GatsbyImage image={node.frontmatter.cover.childImageSharp.gatsbyImageData} alt="cover image"/>)
            }
        </div>
    )
}
*/

const CoverImage = ( { node, ...props} ) => {
    return (
        <div {...props}>
             {node.frontmatter.cover &&
                (<GatsbyImage image={node.frontmatter.cover.childImageSharp.gatsbyImageData} alt="cover image"/>)
            }
        </div>
    )
}
export default CoverImage
