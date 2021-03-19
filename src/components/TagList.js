import React from 'react'
import { useStaticQuery, graphql, navigate} from "gatsby"
import Chip from '@material-ui/core/Chip'
import Badge from '@material-ui/core/Badge'

import { tagArchivePath } from '../utils/archive_path'


const clickHandler = (tag) => {
    navigate(tagArchivePath(tag))
}

const TagList = ( props) => {
    const query = graphql`
    {
        tags: allMdx(filter: {frontmatter: {draft: {ne: true} }}){
            group(field: frontmatter___tags) {
                tag: fieldValue
                totalCount
            }
        }
    }        
    `
    const { tags } = useStaticQuery(query)
    return (
        <div {...props}>
            {tags.group.sort((a,b)=>{return b.totalCount-a.totalCount}).map(node=>(
                <Badge badgeContent={node.totalCount} color="primary" key={node.id}>
                <Chip color="primary" variant="outlined" label={node.tag} onClick={()=> {clickHandler(node.tag)}}/>
                </Badge>
                ))
                
            }

        </div>
    )
}

export default TagList