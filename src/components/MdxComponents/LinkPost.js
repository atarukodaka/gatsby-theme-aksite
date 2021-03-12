import React from 'react'

import { useStaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types'

import PostCard from '../PostCard'
/*

TODO: NOW TAKING TOO LONG TIME TO GET QUERY AND SOMETIMES CAUSES AN ERROR ON DEVELOP ENVIRONMENT.

*/
const query = graphql`
    {
        allMdx {
            nodes {
                ...postFields
            }
        }
    }
`

const LinkPost = ({ to }) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.fields.slug === to)

    return (node === undefined) ?
        <div>NO SUCH SLUG: {to}</div>
            :    
        <PostCard node={node} />
}

LinkPost.propTypes = {
    to: PropTypes.string.isRequired
}

export default LinkPost

