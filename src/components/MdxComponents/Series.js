import React from 'react'
import { Link } from 'gatsby'
import PostCard from '../PostCard'
import useAllPosts from '../../hooks/useAllPosts'

const Series = ( {title, current, display="card"} ) => {

    const allMdx = useAllPosts()
    const nodes = allMdx.nodes.filter(v=>(v.frontmatter.series?.title === title)).sort((a, b)=> a.frontmatter.series.number - b.frontmatter.series.number)
    const currentNumber = parseInt(current)

    switch (display){
    case "text":
        return (<ul>
            { nodes.map(node=>(<li key={node.id}>
                    {(node.frontmatter.series.number === currentNumber) ? 
                        node.fields.postTitle :
                        <Link to={node.fields.slug}>{node.fields.postTitle}</Link>}
                </li>))}
            </ul>)
    default:
        return (<nav>
            {nodes.map(node=>
                (<PostCard node={node} key={node.id} />))
            }   
            </nav>)
    }
}

export default Series
