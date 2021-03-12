import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import Card from './Card'
import HoverBox from './HoverBox'
//import postTitle from './postTitle'


const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    /* color: black; */
    margin: 0em;
`

/*
const Title = styled.h4`
    margin: 0em;
`
*/

const Excerpt = styled.div`
    /* font-size: small; */
    /* color: #444; */
    /* 
    padding-left: 0.5rem;
    */
   font-size: 1rem;
    padding-right: 0.5rem;
`

const Date = styled.div`
    font-size: small;
`
const ClearImage = styled.div`
    clear: both;
`

const Wrapper = ({ node, children }) => {
    return (<HoverBox>
        <Link to={node.fields.slug}>
            <Card>
                {children}
            </Card>
        </Link>
    </HoverBox>)
}

export const PostCard = (props) => {
    switch (props.display) {
        case "simple":
            PostCardSimple(props)
            break;

        default:
            return (
                <PostCard {...props} />
            )
    }
}

export const PostCardMiddle = ({ node }) => (
    <Wrapper node={node} >
        <CoverImage node={node} size="small" />
        <div style={{ marginLeft: "100px" }}>
            <span style={{ marginRight: "1em" }}>{node.frontmatter.date}</span>
            <DirectoryBox node={node} style={{ fontSize: "0.6rem" }}/>
            <Title>{node.fields.postTitle}</Title>
            <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
            <ClearImage />
        </div>
    </Wrapper>
)

const PostCardSimple = ({ node }) => (
    <Wrapper node={node} >
        <CoverImage node={node} size="small" imageSize="50px" />
        <div style={{ marginLeft: "60px" }}>
            {node.fields.postTitle}
            <ClearImage />
        </div>
    </Wrapper>
)

export default PostCard