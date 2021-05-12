import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles'


export const LinkOpenGraphRichForm = ({ title, domain, description, image, imageUrl }) => {
  const theme = createMuiTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const imgSize = (isMobile) ? "6rem" : "9.1rem"

  const cssBox = css`
    border-radius: 10px;
    overflow: hidden;
    line-height: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`
  const cssImageWrapper = css`
    width: ${imgSize};
    height: ${imgSize};
    float: left;
    padding: 0px;
    
    overflow: hidden;
    position: relative;

    .gatsby-image-wrapper {
      width: 100%;
      height: ${imgSize};
      top: 0px;
      position: absolute;
      object-fit: cover;
  }
`
  const HoverBox = styled.div`
    &:hover {
        background-color: #eee;
        opacity: 0.7;
    }
    a {
        text-decoration: none;
        color: black;
        clear: both;
    }
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
`
  //<div style={{marginLeft: imgSize, paddingLeft: "16px", paddingTop: "16px"}}>
  const cssContent = css`
    margin-left: ${imgSize};
    padding-left: 1rem;
    padding-right: 1rem;
`
  const Title = styled.div`
    padding-top: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    overflow: hidden;
    //white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${(isMobile) ? 1 : 3};
    -webkit-box-orient: vertical;
    
    `

  const Description = styled.div`
    margin-top: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.2rem;

    max-height: 3.6rem;
    overflow: hidden;
    
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${(isMobile) ? 1 : 3};
    -webkit-box-orient: vertical;
    
`
  const Domain = styled.div`
    color: gray;
    font-size: 0.9rem;
    leight-height: 1.2rem;
    margin-top: 0.5rem;
`

  //<a href={url} target="_blank" rel="noreferrer">
  //<Description>{description}</Description>
  return (
    
      
    <HoverBox css={cssBox}>
      
      <div>
        
        <div css={cssImageWrapper}>
          <Image image={image} imageUrl={imageUrl} />
        </div>
        <div css={cssContent}>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Domain>{domain}</Domain>
        </div>
      </div>

    </HoverBox>

  )
}

const Image = ({ image, imageUrl = "" }) => {
  if (!!image?.childImageSharp) {
    return (<GatsbyImage image={image.childImageSharp.gatsbyImageData} alt="cover image" />)
  } else if (imageUrl) {
    return (<img src={imageUrl} alt='cover image' />)
  } else {
    return ""
  }
}

const cssLink = css`
  text-decoration: none;
  //color: ${theme.palette.text.primary};
  color: black;
`

const LinkOpenGraph = ({ url, formatter = LinkOpenGraphRichForm }) => {
  const query = graphql`
    {
    allAksOgLink {
      nodes {
        id
        title, domain, description, imageUrl, url, 
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
    `
  const data = useStaticQuery(query)
  const node = data.allAksOgLink.nodes.find(v => v.url === url)
  let content
  if (!node) {
    //console.log(`- url: ${url}`)
    content = formatter({ title: url, url, domain: new URL(url).hostname })
  } else {
    //const { title, url, domain, description, image, imageUrl} = node
    //return LinkOpenGraphForm( node ) 
    content = formatter(node)
  }
  //return (<a href={url} css={cssLink}>{formatter(node)}</a>)
  return (<a href={url} css={cssLink}>{content}</a>)
}

export default LinkOpenGraph

