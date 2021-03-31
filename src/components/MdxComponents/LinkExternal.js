import React from 'react'
//import { Link } from 'gatsby'
//import { css } from '@emotion/react'
//import styled from '@emotion/styled'
import LaunchIcon from '@material-ui/icons/Launch';

//import { grey_hover } from './link_hover'
//import Card from '../Card'
//import HoverBox from '../HoverBox'
import Card from '../Card'
import HoverBox from '../HoverBox'

//const fetch = require('node-fetch');
global.fetch = require('node-fetch');
//const cheerio = require('cheerio'); 
//const axios = require('axios')

const LinkExternal = ({ children, to }) => {
    //const info = getPageInfo(to)
    //console.log(info)
    //const url = "http://atarukodaka.github.io"
    //const res = await axios.get(url)
    //console.log("axios", res)
    //const $ = cheerio.load(res.data)
    //console.log("meta", $("meta[property='og:url']").attr('content'))
    return (
    <HoverBox>
        <a href={to} target="_blank" rel="noreferrer">
            <Card>
                {children}
                <LaunchIcon size="small"/>
            </Card>
        </a>
    </HoverBox>
    
)}


async function getPageInfo(url) {
    const metaProps = await getMetaProps(url)
    
    const site_name = resolveSiteName(metaProps)
    const title = resolveTitle(metaProps)
    const description = resolveDesc(metaProps)
    const image = resolveImageUrl(metaProps)
    
    return { site_name, title, description, image }
  }
  
  function resolveSiteName(metaProps) {
    const ogSiteName = getMetaPropContent(metaProps, 'og:site_name')
    if (ogSiteName) return ogSiteName
    return '(No SiteName)'
  }
  
  function resolveTitle(metaProps) {
    const ogTitle = getMetaPropContent(metaProps, 'og:title')
    if (ogTitle) return ogTitle
    return '(No Title)'
  }
  
  function resolveDesc(metaProps) {
    const ogDesc = getMetaPropContent(metaProps, 'og:description')
    if (ogDesc) return ogDesc
    return ''
  }
  
  function resolveImageUrl(metaProps) {
    const ogImage = getMetaPropContent(metaProps, 'og:image')
    if (ogImage) return ogImage
    return ''
  }
  
  function getMetaPropContent(metaProps, propKey) {
    const mpObj = metaProps.find((d, i, arr) => {
      return d[propKey]
    })
    if (mpObj) return mpObj[propKey]
    return ''
  }
  
  async function getMetaProps(url) {
    const result = await global.fetch(url).then(res => {
        if (res.ok) { return res.text() }
      }).then(html => {
        const metaProps = extractMetaProps(html)
        return metaProps
      }).catch(e => {
        throw e
      })
    return result
  }
  
  function extractMetaProps(html) {
    const $ = cheerio.load(html)
    let results = []
    $('head meta').each((i, el) => {
      const property = $(el).attr('property')
      const content = $(el).attr('content')
      if (property && content) {
        results.push({ [property]: content })
      }
    })
    results.sort((a,b) => {
      if (Object.keys(a)[0] < Object.keys(b)[0]) return -1
      if (Object.keys(a)[0] > Object.keys(b)[0]) return 1
      return 0
    })
    console.log(results)
    return results
  }

export default LinkExternal
