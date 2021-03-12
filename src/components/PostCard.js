import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Box from '@material-ui/core/Box'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
//import Card from './Card'
import HoverBox from './HoverBox'
//import postTitle from './postTitle'


const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    /* color: black; */
    margin: 0em;
`

const Date = styled.div`
    font-size: small;
`
const ClearImage = styled.div`
    clear: both;
`


export const PostCard = ({ node }) => (
    <HoverBox>
        <Link to={node.fields.slug}>
            <Box p={1} boxShadow={1}>
                <CoverImage node={node} size="small" />
                <Box ml={12}>
                    <Date>{node.frontmatter.date}</Date>
                    <Title>{node.fields.postTitle}</Title>
                    <DirectoryBox node={node} style={{ fontSize: "0.6rem" }} />
                    {node.frontmatter.description || node.excerpt}
                    <ClearImage />
                </Box>
            </Box>
        </Link>
    </HoverBox>
)

export default PostCard