import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { LinkOpenGraphRichForm } from 'gatsby-plugin-aks-og-link'
//import useMediaQuery from '@material-ui/core/useMediaQuery';

import { isMobile } from '../styles/theme'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import HoverBox from './HoverBox'
import Card from './Card'
import theme from '../styles/theme'

const cssLinkPost = css`
    a{
    text-decoration: none;
    color: ${theme.palette.text.primary};
    }
    
`

const LinkPost = ({ node, display, label, ...props }) => {
    if (display === 'card') {

        return (<div css={cssLinkPost}><Link to={node.fields.path} >
            <LinkOpenGraphRichForm title={node.fields.postTitle}
            domain={node.frontmatter.date + " [" + node.fields.directoryFullLabel + "]"} description={node.frontmatter.description || node.excerpt }
            image={node.frontmatter.cover} imageUrl={node.frontmatter.cover?.publicURL}
            />
            </Link></div>
        )
       
        //const imgSize = "9.1rem"

        //console.log("linkpost", node.fields.slug, theme)
        //const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
        //const isMobile = useMediaQuery(theme.breakpoints.down('mobile'))
        const imgSize = (isMobile()) ? "6rem" : "9.1rem"

        const cssBox = css`
            max-width: 800px;
            border-radius: 10px;
            overflow: hidden;
      
            height: ${imgSize};
            box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
            clear: both;
            margin-top: 1rem;
            margin-bottom: 1rem;
        `
        const cssContent = css`
            margin-left: ${imgSize};
            padding: 0.75rem;
        `

        
        const cssCoverImage = css`
            width: ${imgSize};
            height: ${imgSize};
            float: left;
            background-color: #f2f2f2;

            .gatsby-image-wrapper {
                width: 100%;
                height: 100%;
            }
        `
        const Title = styled.div`
            font-size: 1rem;
            line-height: 1.3rem;
            max-height: 1.3rem;
            font-weight: bold;
            margin-top: 0.75rem;
            overflow: hidden;
            text-overflow: ellipsis;
        `

        const Description = styled.div`
            font-size: 0.9rem;
            line-height: 1.2rem;
            max-height: 3.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 0.75rem;
        `
        const cssLink = css`
            text-decoration: none;
            color: ${theme.palette.text.primary};
        `

        return (
            <Link to={node.fields.path} css={cssLink}>
            <HoverBox {...props} css={cssBox}>
                
                    <CoverImage node={node} css={cssCoverImage}/>
                    <div css={cssContent}>
                        <div style={{fontSiize: "0.9rem", lineHeight: "1.2rem"}}>
                            <span>{node.frontmatter.date}</span>
                            <DirectoryBox directory={node.fields.directory} />
                        </div>
                        <Title>{node.fields.postTitle}</Title>
                        { (isMobile()) ? null : 
                        <Description>{node.frontmatter.description || node.excerpt}</Description>}
                    </div>
                
            </HoverBox>
            </Link>
        )

    } else {
        const title = node.fields.postTitle || node.frontmatter.title
        //const linkComponent = (<Link to={node.fields.path}>{prefix}{title}{postfix}</Link>)

        switch (display) {
            case 'box':
                return <HoverBox {...props}><Link to={node.fields.path}><Card>{label || title}</Card></Link></HoverBox>
                
            case 'title':
                return <HoverBox {...props}><Link to={node.fields.path}>{label || title}</Link></HoverBox>
            default:
                return <Link to={node.fields.path} {...props}>{label || title}</Link>

        }
    }

}

export default LinkPost
