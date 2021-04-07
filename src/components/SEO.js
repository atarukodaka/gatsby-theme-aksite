import React from "react"

/* import PropTypes from "prop-types" */
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"
import useSiteMetadata from '../hooks/useSiteMetadata'
import useAksConfig from '../hooks/useAksConfig'
const urljoin = require('url-join')
//import useAksCOnfig from '../hooks/useAksConfig'

const SEO = ( { title, description, image, lang, isRoot  } ) => {
    const { pathname } = useLocation()

    const { title: siteTitle, description: siteDescription, siteUrl, 
        coverImage: siteCoverImage, social: { twitter} } = useSiteMetadata()
    
    //const coverImage = cover || siteCoverImage
    //const url = [siteUrl, pathname].join('')
    const url = urljoin(siteUrl, pathname)
    
    //title ||= siteTitle
    //const isRoot = ( pathname === '/')
    const ogType = isRoot ? 'website' : 'article'

    const fullTitle = (isRoot) ? siteTitle : `${title} | ${siteTitle}`
    const fullDescription = (isRoot) ? siteDescription : description || siteDescription
    //const imageUrl = siteUrl + coverImage
    const siteImage = `og-pages/site/cover.png`
    const imageUrl = urljoin(siteUrl, image || siteImage)
    const aksConfig = useAksConfig()
    const defaultLang = aksConfig.defaultLang    
        
    //console.log("seo image url", cover, imageUrl)
    return (
        <Helmet
            htmlAttributes={{ lang: lang || defaultLang}}
            title={fullTitle}
            meta={[
                { name: 'description', content: fullDescription },
                { name: 'image', content: imageUrl },
                { property: 'og:url', content: url },
                { property: 'og:type', content: ogType },
                { property: 'og:title', content: fullTitle },
                { property: 'og:description', content: fullDescription },
                { property: 'og:site_name', content: siteTitle },
                { property: 'og:image', content: imageUrl },
                { name: 'twitter:card', content: 'summary_large_image'},
                { name: 'twitter:creator', content: twitter },
                { name: 'twitter:title', content: fullTitle},
                { name: 'twitter:description', content: fullDescription },
                { name: 'twitter:image', content: imageUrl }
            ]}
        />
    )
}

/*
SEO.propTypes = {
    title: PropTypes.string.isRequired,  
    description: PropTypes.string,
    cover: PropTypes.string,
    lang: PropTypes.string,
  }
  
  SEO.defaultProps = {
    title: null,
    description: null,
    cover: null,
    lang: null,
  }
  */
export default SEO