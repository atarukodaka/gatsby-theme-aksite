import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import PostCard from './PostCard'

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

const RecentPosts = (  ) => {
    const { recentPosts } = useStaticQuery(query)

    return (<ul>
        {recentPosts.nodes.map(node => (
            <li>
                <Link to={node.fields.slug}>{node.fields.postTitle}[{node.fields.directory}]</Link>
            </li>
        ))}
        </ul>)
    /*
    return (<nav>
        {recentPosts.nodes.map(node => (
            <PostCard node={node} key={node.id} display="text"/>
      
            
        ))}
    </nav>)
    */
}

export default RecentPosts
