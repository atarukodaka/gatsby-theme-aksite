import React from 'react'
//import { useStaticQuery, Link } from 'gatsby'
import styled from '@emotion/styled'
import Box from '@material-ui/core/Box'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
//import Card from './Card'
//import HoverBox from './HoverBox'
import NavigateCard from './NavigateCard'

const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    /* color: black; */
    margin: 0em;
`

const Date = styled.span`
    font-size: small;
`
const ClearImage = styled.div`
    clear: both;
`

export const PostCard = ({ node, ...props }) => (
    <NavigateCard to={node.fields.path} {...props}>
                <CoverImage node={node} size="small" />
                <Box ml={12}>
                    <Date>{node.frontmatter.date}</Date>
                    <DirectoryBox directory={node.fields.directory}/>
                    <Title>{node.fields.postTitle}</Title>
                    {node.frontmatter.description || node.excerpt}
                    <ClearImage />
                </Box>
    </NavigateCard>
)

export default PostCard