/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

 const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})
const withDefaults = require('./src/utils/default_options')

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)
  //console.log("options", options)
  const crumbLabelUpdates = (options.directoryLabels) ? Object.keys(options.directoryLabels).map(k => {
    return { pathname: k, crumbLabel: options.directoryLabels[k] }
  }) : []
    
  return {
    siteMetadata: {
      title: 'SITE TITLE',
      author: 'AUTHOR NAME',
      email: 'author@mail.address.com',
      description: 'SITE DESCRIPTION',
      siteUrl: 'https://site.address.come',
      //siteUrl: `http://localhost:8000/`,
      coverImage: '/images/top.png',
      social: {
        twitter: 'foo_bar',
        github: 'foobar',
      }      
    },
    plugins: [
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-remark-images`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: options.contentPath || `content/posts`,
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `assets`,
          path: options.assetPath || `content/assets`,
        },
      },
      /*
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `src/pages`,
        },
      },*/
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.md`, `.mdx`],
          /* 
          defaultLayouts: {
            default: require.resolve("./src/templates/post-template.js"),
          },*/
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-autolink-headers`,
              options: {
                isIconAfterHeader: true,
                className: 'heading-anchor',
              }
            },
            {
              resolve: "gatsby-remark-embed-video",
              options: {
                width: "100%",
                ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                //height: 400, // Optional: Overrides optional.ratio
                related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                noIframeBorder: true, //Optional: Disable insertion of <style> border: 0

                urlOverrides: [
                  {
                    id: "youtube",
                    embedURL: videoId =>
                      `https://www.youtube-nocookie.com/embed/${videoId}`,
                  },
                ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support

                containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              },
            },

            'gatsby-remark-prismjs-title',
            //`gatsby-remark-code-titles`,
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                alias: { js: 'javascript', sh: 'bash', md: 'markdown' },
              }
            },
            `gatsby-remark-relative-images`,
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 700,
                disableBgImage: true,
                linkImagesToOriginal: false
              },
            },
            {
              resolve: `gatsby-remark-image-attributes`,
              options: {
                styleAttributes: true,
                dataAttributes: false
              }
            },
            `gatsby-remark-responsive-iframe`,
          ]
        }
      },
      {
        resolve: `gatsby-plugin-breadcrumb`,
        options: {
          useAutoGen: true,
          autoGenHomeLabel: `Home`,
          excludes: [
            `**/dev-404-page/**`,
            `**/404/**`,
            `**/404.html`,
            `**/offline-plugin-app-shell-fallback/**`
          ],
          excludeOptions: {
            separator: '.'
          },
          crumbLabelUpdates: crumbLabelUpdates,
          //trailingSlashes: true,
        }
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "`${process.env.GA_TRACKING_ID}`",
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is optional
          anonymize: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sitemap`,
      `gatsby-plugin-material-ui`,
      `gatsby-plugin-emotion`,
    ],
  }
}
