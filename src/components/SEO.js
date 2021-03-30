import React from "react"

/* import PropTypes from "prop-types" */
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"
import useSiteMetadata from '../hooks/useSiteMetadata'
//import useAksCOnfig from '../hooks/useAksConfig'

const SEO = ( { title, description, cover, lang  } ) => {
    const { pathname } = useLocation()

    const { title: siteTitle, description: siteDescription, siteUrl, 
        coverImage: siteCoverImage, social: { twitter} } = useSiteMetadata()
    const coverImage = cover || siteCoverImage
    const url = [siteUrl, pathname].join('')
    
    //title ||= siteTitle
    const fullTitle = `${title} | ${siteTitle}`
    const fullDescription = description || siteDescription
    const imageUrl = siteUrl + coverImage
    const defaultLang = "ja" // TODO: shd be 'en' or customialbe??
        
    console.log("seo image url", cover, imageUrl)
    return (
        <Helmet
            htmlAttributes={{ lang: lang || defaultLang}}
            title={fullTitle}
            meta={[
                { name: 'description', content: fullDescription },
                { name: 'image', content: imageUrl },
                { property: 'og:url', content: url },
                { property: 'og:description', content: fullDescription },
                { property: 'og:image', content: imageUrl },
                { name: 'twitter:card', content: 'summary'},
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