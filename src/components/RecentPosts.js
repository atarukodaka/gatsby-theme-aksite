import React from 'react'
import { Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import HoverBox from './HoverBox'
import useAllPosts from '../hooks/useAllPosts'
import useAksConfig from '../hooks/useAksConfig'

const cssItem = css`
    a {
        text-decoration: none;
    }
    background: url(/icons/right_arrow.png) no-repeat;
    padding-top: 4px;
    opacity: 0.8;

`
const RecentPosts = () => {
    const recentPosts = useAllPosts().nodes.sort((a, b) => {return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)}) 
    const numPosts = 5  // TODO: to be configuable
    const { listPath } = useAksConfig()

    return (
        <>
        <List>
            {recentPosts.slice(0, numPosts).map(node => (
                <ListItem key={node.id} css={cssItem}>
                    <HoverBox>
                        <Link to={node.fields.path}>
                            <Typography>
                                {node.fields.postTitle}
                            </Typography>
                        </Link>

                    </HoverBox>
                </ListItem>
            ))}
            
        </List>
        <HoverBox style={{marginLeft: "2rem", opacity: "0.8"}}>
            <Link to={listPath}><Typography>...and other older posts</Typography>
            </Link>
        </HoverBox>
        </>
    )
}


export default RecentPosts
