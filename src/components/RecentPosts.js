import React from 'react'
import { Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'

import HoverBox from './HoverBox'
import useAllPosts from '../hooks/useAllPosts'

/*
const query = graphql`
{
    recentPosts: allMdx(limit: 5,
            sort: {fields: frontmatter___date, order: DESC}
        ) {
        nodes {
            ...postFields
        }
    }
}
`
*/

const cssItem = css`
    a {
        text-decoration: none;
    }
    background: url(/icons/right_arrow.png) no-repeat;
    padding-top: 4px;
    opacity: 0.8;

`
const RecentPosts = () => {
    const recentPosts = useAllPosts() // StaticQuery(query)
    const numPosts = 5

    return (
        <>
        <List>
            {recentPosts.nodes.slice(0, numPosts).map(node => (
                <ListItem key={node.id} css={cssItem}>
                    <HoverBox>
                        <Link to={node.fields.slug}>
                            <Typography>
                                {node.fields.postTitle}
                            </Typography>
                        </Link>

                    </HoverBox>
                </ListItem>
            ))}
            
        </List>
        <HoverBox style={{marginLeft: "2rem", opacity: "0.8"}}><Link to="/list"><Typography>...and other older posts</Typography></Link></HoverBox>
        </>
    )
}
/*
    const display = "text"

    switch (display) {
        case "text":
            return (
                <List>
                    {recentPosts.nodes.map(node => (
                        <ListItem key={node.id} css={cssItem}>
                            <HoverBox>
                                <Link to={node.fields.slug}>
                                    <Typography>
                                        {node.fields.postTitle}
                                    </Typography>
                                </Link>

                            </HoverBox>
                        </ListItem>
                    ))}
                </List>
            )
        case 'card':
        default:

            return (<nav>
                {recentPosts.nodes.map(node => (
                    <PostCard node={node} key={node.id} display="text" />
                ))}
            </nav>)
    }
    */


export default RecentPosts
