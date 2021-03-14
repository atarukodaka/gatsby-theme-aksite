import React from 'react'

import PropTypes from 'prop-types'
import useAllPosts from '../../hooks/useAllPosts'

import PostCard from '../PostCard'

const LinkPost = ({ to }) => {
    const allMdx = useAllPosts()
    const node = allMdx.nodes.find(v => v.fields.slug === to)

    return (node === undefined) ?
        <div>NO SUCH SLUG: {to}</div>
            :    
        <PostCard node={node} />
}

LinkPost.propTypes = {
    to: PropTypes.string.isRequired
}

export default LinkPost

