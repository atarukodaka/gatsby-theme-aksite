import React from 'react'
import { Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import HoverBox from '../components/HoverBox'
import Card from '../components/Card'
import useAllPosts from '../hooks/useAllPosts'

const PrevNextPost = ({ node }) => {
    const allMdx = useAllPosts()
    const index = allMdx.nodes.map(v => v.id).indexOf(node.id)
    const prevPost = (index > 0) ? allMdx.nodes[index - 1] : null
    const nextPost = (index < allMdx.nodes.length) ? allMdx.nodes[index + 1] : null

    return (
        <nav style={{ marginBottom: "2rem" }}>
            <Grid container>
                <Grid item md={6} sm={12}>
                    {prevPost && (<HoverBox><Link to={prevPost.fields.slug}><Card>《 {prevPost.fields.postTitle}</Card></Link></HoverBox>)}
                </Grid>
                <Grid item md={6} sm={12}>
                    {nextPost && (<HoverBox ><Link to={nextPost.fields.slug}><Card>{nextPost.fields.postTitle} 》</Card></Link></HoverBox>)}
                </Grid>
            </Grid>
        </nav>)

}

export default PrevNextPost