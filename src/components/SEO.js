import React from "react"

/* import PropTypes from "prop-types" */
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"
import useSiteMetadata from '../hooks/useSiteMetadata'
import useAksConfig from '../hooks/useAksConfig'
const urljoin = require('url-join')
//import { ogSiteImagePath } from 'gatsby-plugin-aks-og-images'
import { ogSiteImagePath } from '../utils/og-images-path'

const SEO = ( { title, description, image, lang, isRoot  } ) => {
    const { pathname } = useLocation()

    const { title: siteTitle, description: siteDescription, siteUrl, 
        social: { twitter} } = useSiteMetadata()
    
    const url = urljoin(siteUrl, pathname)
    
    const ogType = isRoot ? 'website' : 'article'

    const fullTitle = (isRoot) ? siteTitle : `${title} | ${siteTitle}`
    const fullDescription = (isRoot) ? siteDescription : description || siteDescription
    //const imageUrl = siteUrl + coverImage
    //const siteImage = `og-pages/site/cover.png`
    const imageUrl = urljoin(siteUrl, image || ogSiteImagePath())
    const aksConfig = useAksConfig()
    const defaultLang = aksConfig.defaultLang
        
    //console.log("image: ", image)
    //console.log("site image", ogSiteImagePath())
    //console.log("imageUrl", imageUrl)
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