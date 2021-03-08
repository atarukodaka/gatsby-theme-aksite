import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'
import theme from '../styles/theme'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import HoverBox from './HoverBox'

const query = graphql`
{
    recentPosts: allMdx(
        limit: 5,
        sort: {fields: frontmatter___date, order: DESC}
        ) {
        nodes {
            ...postFields
        }
    }
}
`

const cssItem = css`
    a {
        color: ${theme.palette.text.primary};
        text-decoration: none;
    }
`
const RecentPosts = () => {
    const { recentPosts } = useStaticQuery(query)

    return (
        <List>
            {recentPosts.nodes.map(node => (
                <ListItem key={node.id} css={cssItem}>
                    <HoverBox>
                    <Link to={node.fields.slug} >
                        <Typography>
                            {node.fields.postTitle}[{node.fields.directory}]
                        </Typography>
                    </Link>
                    </HoverBox>
                </ListItem>
            ))}
        </List>

    )
    /*
    return (<nav>
        {recentPosts.nodes.map(node => (
            <PostCard node={node} key={node.id} display="text"/>
      
            
        ))}
    </nav>)
    */
}

export default RecentPosts
