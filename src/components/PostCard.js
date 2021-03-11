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

const Wrapper = ({ node, children, disableLink = false }) => {
    return (disableLink) ?
        (<div>{children}</div>) :
        (<HoverBox>
            <Link to={node.fields.slug}>
                {children}
            </Link>
        </HoverBox>)
}

export const PostCard = (props) => {
    switch (props.display) {
        case "text":
            PostCardText(props)
            break;

        case "small":
            PostCardSmall(props)
            break;

        default:
            return (
                <PostCardSmall {...props} />
            )
    }
}

export const PostCardMiddle = ({ node, disableLink = false }) => (
    <Wrapper node={node} disableLink={disableLink}>
        <Card>
            <CoverImage node={node} size="small" />
            <div style={{ marginLeft: "100px" }}>
                <span style={{ marginRight: "1em" }}>{node.frontmatter.date}</span>
                <DirectoryBox node={node} style={{ fontSize: "0.6rem" }} disableLink={true} />
                <Title>{node.fields.postTitle}</Title>

                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
                <ClearImage />
            </div>
        </Card>

    </Wrapper>
)

const PostCardSmall = ({ node, disableLink = false }) => (
    <Wrapper node={node} disableLink={disableLink}>
        <Card>
            <CoverImage node={node} size="small" imageSize="50px"/>
            <div style={{ marginLeft: "60px" }}>

                {node.fields.postTitle}
                <ClearImage />
            </div>
        </Card></Wrapper>
)

const PostCardText = () => { }
export default PostCard