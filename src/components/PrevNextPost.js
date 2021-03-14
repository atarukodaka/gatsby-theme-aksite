import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import HoverBox from '../components/HoverBox'
import Card from '../components/Card'

const PrevNextPost = ({ node }) => {
    const query = graphql`
    {
        allMdx(sort: {fields: frontmatter___date, order: ASC}) {
            nodes {
            ...postFields
            }
        }
    }
    `
    const data = useStaticQuery(query)
    const index = data.allMdx.nodes.map(v => v.id).indexOf(node.id)
    const prevPost = (index > 0) ? data.allMdx.nodes[index - 1] : null
    const nextPost = (index < data.allMdx.nodes.length) ? data.allMdx.nodes[index + 1] : null

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