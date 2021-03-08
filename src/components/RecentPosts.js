import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import PostCard from './PostCard'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'
import theme from '../styles/theme'

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
const RecentPosts = (  ) => {
    const { recentPosts } = useStaticQuery(query)

    return (
        
            <ul>
        {recentPosts.nodes.map(node => (
            <Typography>
            <li key={node.id}  css={cssItem}>  
                <Link to={node.fields.slug} color="inherit">
                    {node.fields.postTitle}[{node.fields.directory}]
                </Link>
            </li>
            </Typography>
        ))}
        </ul>
        
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
