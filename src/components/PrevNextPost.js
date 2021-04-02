import React from 'react'
import Grid from '@material-ui/core/Grid'
import useAllPosts from '../hooks/useAllPosts'
import LinkPost from './LinkPost'

const OlderPost = ( {node} ) => {
    return (node) ? <LinkPost node={node} display="box" postfix="》" style={{ textAlign: "right" }}/> : ''
}
const NewerPost = ( {node} ) => {
    return (node) ? <LinkPost node={node} display="box" prefix="《" /> : ''
}

const PrevNextPost = ({ node }) => {
    const nodes = useAllPosts().nodes.sort((a, b) => { return new Date(a.frontmatter.date) - new Date(b.frontmatter.date) })
    const index = nodes.map(v => v.id).indexOf(node.id)
    const olderPost = (index > 0) ? nodes[index - 1] : null
    const newerPost = (index < nodes.length) ? nodes[index + 1] : null

    return (
        <nav>
            <Grid container>
                <Grid item md={6} sm={12}>
                    <NewerPost node={newerPost} />
                </Grid>
                <Grid item md={6} sm={12}>
                    <OlderPost node={olderPost} />
                </Grid>

            </Grid>
        </nav>
    )
}

export default PrevNextPost