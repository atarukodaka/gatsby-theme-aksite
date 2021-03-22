import React from 'react'

import useAllPosts from '../hooks/useAllPosts'
import PostCard from './PostCard'

const RelevantPosts = ( {node} ) => {
    const { nodes } = useAllPosts()
    const siblings = nodes.filter(v=> (v.id !== node.id) && (v.fields.directory === node.fields.directory))
    
    return (<div style={{marginBottom: "2rem"}}>
            {siblings.slice(0, 5).map(v=>
                (<PostCard node={v} key={v.id} />))
            }
          
          </div>)
}

export default RelevantPosts
  