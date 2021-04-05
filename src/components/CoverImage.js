import React from 'react'
import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'

const CoverImage = ({ node, size = "regular", imageSize = "80px", ...props }) => {

    const cssWrapperSmall = css`
        width: ${imageSize};
        height: ${imageSize};
        float: left;
        /* box-shadow: 2px 2px 1px rgb(0 0 0 / 20%); */
        /*
        margin-right: 0.5rem;
        margin-bottom: 0rem;
        */
        background-color: #f2f2f2;

        .gatsby-image-wrapper {
            width: 100%;
            height: 100%;
        }
    `

    const cssWrapperWide = css`
        .gatsby-image-wrapper {
            width: 100%;
            height: 200px;
        }
    `

    const cssWrapper = (size === "small") ? cssWrapperSmall : cssWrapperWide
    return (
        <div css={cssWrapper} {...props}>
            {node.frontmatter.cover &&
                (<GatsbyImage image={node.frontmatter.cover.childImageSharp.gatsbyImageData} />)
            }
        </div>
    )
}
export default CoverImage
