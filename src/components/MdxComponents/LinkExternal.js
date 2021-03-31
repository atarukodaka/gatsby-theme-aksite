import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
//import LaunchIcon from '@material-ui/icons/Launch';
import Box from '@material-ui/core/Box'
import Img from 'gatsby-image'

//import { grey_hover } from './link_hover'
//import Card from '../Card'
//import HoverBox from '../HoverBox'
import Card from '../Card'
import HoverBox from '../HoverBox'

//const fetch = require('node-fetch');
//global.fetch = require('node-fetch');
//const cheerio = require('cheerio'); 
//const axios = require('axios')

const query = graphql`
{
  allLinksYaml {
    nodes {
      url
      fields {
        title
        url
        image
        description
      }
    }
  }
  ogpImages: allFile(filter: {fields: {ogpImage: {eq: "true"}}}) {
    nodes {
			url
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        } 
      }


      fields {
        link
        ogpImage
      }
   
    }
  }
}
`

const size = "100px"

const cssImageWrapper = css`
  width: ${size};
  height: ${size};
  float: left;
  
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: ${size};
    top: 0px;
    position: absolute;
    object-fit: cover;
  }

`

const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0em;
`
const ClearImage = styled.div`
    clear: both;
`

const LinkExternal = ({ to, children }) => {
  const data = useStaticQuery(query)
  const node = data.allLinksYaml.nodes.find(v => v.url === to)
  //console.log(node)
  //const { title, description, image } = (node) ? node.fields : { title: "", description: "", image: ""}

  let title, description, image

  if (node){
    title = node.fields.title
    description = node.fields.description
    image = node.fields.image
  } else {
    title = children
  }
  const imgNode = data.ogpImages.nodes.find(v=>v.fields.link === to)

  return (
    <HoverBox>
      <a href={to} target="_blank" rel="noreferrer">
        <Card>
          <div css={cssImageWrapper}>
            { (imgNode) ? <Img fluid={imgNode.childImageSharp.fluid} /> :
            <img src={image}/>
            }
          </div>
          <Box ml={14}>
            <Title>{title || children}</Title>
            <div>{description}</div>
            <ClearImage />
          </Box>
        </Card>
      </a>
    </HoverBox>

  )
}

export default LinkExternal

