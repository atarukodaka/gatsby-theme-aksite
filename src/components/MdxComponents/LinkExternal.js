import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Box from '@material-ui/core/Box'
import Img from 'gatsby-image'
import GatsyImage from 'gatsby-plugin-image'

import HoverBox from '../HoverBox'

const query = graphql`
{
  allLinksYaml {
    nodes {
      id
      url
      fields {
        domain
        image
        title
        url
        description
      }
    }
  }
  ogpImages: allFile ( filter: { fields: { ogpImage: {eq: true }}}){  
    totalCount
    nodes {
      id
      fields { url }
      childImageSharp {
        gatsbyImageData
      }
    }
  }
}
`
const size = "120px"

const cssImageWrapper = css`
  width: ${size};
  height: ${size};
  float: left;
  padding: 0px;
  
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    width: 100%;
    height: ${size};
    top: 0px;
    position: absolute;
    object-fit: cover;
  }

`

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  `
const Description = styled.div`
  font-size: 0.8rem;
  padding-top: 1rem;
  
`
const Domain = styled.div`
  color: gray;
  margin-top: 0.5rem;
`
const ClearImage = styled.div`
    clear: both;
`
const LinkRichForm = ( {url, title, domain, description, imgNode, image}) => {
  return (
    <HoverBox style={{marginBottom: "1rem"}}> 
      <a href={url} target="_blank" rel="noreferrer">
        <Box boxShadow={2}>
          <div css={cssImageWrapper}>
            { (!!imgNode?.childImageSharp ) ? <GatsbyImage image={imgNode.childImageSharp.gatsbyImageData} /> :
            <img src={image}/>
            }
          </div>
          <Box ml={16} py={2} px={2}>
            <Title>{title }</Title>
            <Description>{description?.substr(0,100)}</Description>
            <Domain>{domain}</Domain>
            <ClearImage />
          </Box>
        </Box>
      </a>
    </HoverBox>

  )
}
const LinkExternal = ({ url }) => {
  const data = useStaticQuery(query)

  const node = data.allLinksYaml.nodes.find(v=>v.url === url)
  //if (!node) return (<a href={url}>{children || url}</a>)
  if (!node) {
    console.log(`LinkExternal: no such url. registere it i src/data/links.yaml:
- url: ${url}`)
    return LinkRichForm( { title: url, url, domain: new URL(url).hostname })
  }

  const { title, domain, description, image } = node.fields
  
  const imgNode = data.ogpImages.nodes.find(v=>v.fields.url === url)  
  //console.log("url", url, imgNode)
  //console.log(data.ogpImages.nodes)
  //console.log("total count: ", data.ogpImages.totalCount)

  return LinkRichForm( { title, domain, description, imgNode, image, url})
}

export default LinkExternal

