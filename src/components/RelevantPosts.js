import React from 'react'

import useAllPosts from '../hooks/useAllPosts'
//import PostCard from './PostCard'
import LinkPost from './LinkPost'

const RelevantPosts = ( {node} ) => {
    const { nodes } = useAllPosts()
    const siblings = nodes.filter(v=> (v.id !== node.id) && (v.fields.directory === node.fields.directory)).sort((a, b)=>  { return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)} )
    
    return (<div style={{marginBottom: "2rem"}}>
            {siblings.slice(0, 5).map(v=>
                (<LinkPost node={v} display='card' key={v.id} />))
            }
          
          </div>)
}

export default RelevantPosts
  