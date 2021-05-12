import React from 'react'
import { Link } from 'gatsby'
//import styled from '@emotion/styled'
import { css } from '@emotion/react'
//import { LinkOpenGraphRichForm } from 'gatsby-plugin-aks-og-link'
import { LinkOpenGraphRichForm } from './LinkOpenGraph'
//import useMediaQuery from '@material-ui/core/useMediaQuery';

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

        return (<div css={cssLinkPost}>
            <Link to={node.fields.path} >
            
            <LinkOpenGraphRichForm title={node.fields.postTitle}
            domain={node.frontmatter.date + " [" + node.fields.directoryFullLabel + "]"} description={node.frontmatter.description || node.excerpt }
            image={node.frontmatter.cover} imageUrl={node.frontmatter.cover?.publicURL}
            />
            </Link></div>
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
