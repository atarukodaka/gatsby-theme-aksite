import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Box from '@material-ui/core/Box'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import HoverBox from './HoverBox'
import Card from './Card'

const LinkPost = ({ node, display, prefix, postfix, ...props }) => {
    if (display === 'card') {
        const Title = styled.div`
            font-size: 1rem;
            font-weight: bold;
            margin: 0em;        `

        const Date = styled.span`
            font-size: small;
        `
        const Description = styled.div`
            font-size: 0.8rem;
        `
        const ClearImage = styled.div`
            clear: both;
        `
        return (
            <HoverBox {...props}>
                <Card>
                    <Link to={node.fields.path}>
                        <CoverImage node={node} size="small" />
                        <Box ml={12}>
                            <Date>{node.frontmatter.date}</Date>
                            <DirectoryBox directory={node.fields.directory} />
                            <Title>{node.fields.postTitle}</Title>
                            <Description>{node.frontmatter.description || node.excerpt}</Description>
                            <ClearImage />
                        </Box>
                    </Link>
                </Card>
            </HoverBox>)

    } else {
        const title = node.fields.postTitle || node.frontmatter.title
        const linkComponent = (<Link to={node.fields.path}>{prefix}{title}{postfix}</Link>)

        switch (display) {
            case 'box':
                return <HoverBox {...props}><Card>{linkComponent}</Card></HoverBox>
            case 'title':
                return <HoverBox {...props}>{linkComponent}</HoverBox>
            default:
                return <span {...props}>{linkComponent}</span>

        }
    }
  
}

export default LinkPost
