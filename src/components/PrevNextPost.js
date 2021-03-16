import React from 'react'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import { Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import HoverBox from '../components/HoverBox'
import Card from '../components/Card'
import useAllPosts from '../hooks/useAllPosts'

const NavigateBox = ({ to, text }) => (
    <>
        <HoverBox>
            <Link to={to}>
                <Card>
                    {text}
                </Card>
            </Link>
        </HoverBox>
    </>

)

const PrevPost = ({ node }) => {
    return (node) ? 
        (<NavigateBox to={node.fields.slug} text={`${node.fields.postTitle}》`}/>)
         :  null
}


const NextPost = ({ node }) => {
    return (node) ? 
        (<NavigateBox to={node.fields.slug} text={`《${node.fields.postTitle}`}/>)
         :  null
}

const PrevNextPost = ({ node }) => {
    const nodes = useAllPosts().nodes.sort((a, b) => { return new Date(a.frontmatter.date) - new Date(b.frontmatter.date) })
    const index = nodes.map(v => v.id).indexOf(node.id)
    const prevPost = (index > 0) ? nodes[index - 1] : null
    const nextPost = (index < nodes.length) ? nodes[index + 1] : null

    return (
        <nav>
            <Hidden smDown>
                <Grid container>
                    <Grid item md={6}>
                        <NextPost node={nextPost} />
                    </Grid>
                    <Grid item md={6}>
                        <PrevPost node={prevPost} />
                    </Grid>

                </Grid>
            </Hidden>
            <Hidden mdUp>
                <PrevPost node={prevPost} />
                <NextPost node={nextPost} />
            </Hidden>
        </nav>
    )

    /*
    return (
        
        <nav style={{ marginBottom: "2rem" }}>
            <Grid container>
                <Grid item md={6} sm={12}>
                    {prevPost && (<HoverBox><Link to={prevPost.fields.slug}><Card>《{prevPost.fields.postTitle}</Card></Link></HoverBox>)}
                </Grid>
                <Grid item md={6} sm={12}>
                    {nextPost && (<HoverBox ><Link to={nextPost.fields.slug}><Card>{nextPost.fields.postTitle}》</Card></Link></HoverBox>)}
                </Grid>
            </Grid>
        </nav>)
        */


}

export default PrevNextPost