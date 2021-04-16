import React from 'react'
import { Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import { css } from '@emotion/react'

import useAllPosts from '../hooks/useAllPosts'
//import LinkPost from './LinkPost'
import HoverBox from './HoverBox'

const cssCard = css`
    padding: 0.75rem;
    font-size: 1rem;
    line-height: 1.3rem;
    //height: 3.6rem;
    min-height: 4.0rem;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
`

const NavigatePost = ( {node, prefix="", postfix="", ...props}) => {
    return (
        <HoverBox {...props}>
            <Link to={node.fields.path}>
                <div css={cssCard}>
                    {prefix + node.fields.postTitle + postfix}
                </div>
            </Link>
        </HoverBox>
    )
}

const OlderPost = ( {node} ) => {
    if (!node) return ''

    return (<NavigatePost node={node} postfix= ' 》' style={{textAlign: "right"}}/>)
    //return (node) ? <LinkPost node={node} label={node.fields.postTitle + '》'} display="box" style={{ textAlign: "right" }}/> : ''
}
const NewerPost = ( {node} ) => {
    if (!node) return ''

    return (<NavigatePost node={node} prefix= '《 '/>)
    //return (node) ? <LinkPost node={node} label={'《'+node.fields.postTitle} display="box" /> : ''
}

const PrevNextPost = ({ node }) => {
    const nodes = useAllPosts().nodes.sort((a, b) => { return new Date(a.frontmatter.date) - new Date(b.frontmatter.date) })
    const index = nodes.map(v => v.id).indexOf(node.id)
    const olderPost = (index > 0) ? nodes[index - 1] : null
    const newerPost = (index < nodes.length) ? nodes[index + 1] : null

    return (
        <nav>
            <NewerPost node={newerPost} />
            <OlderPost node={olderPost} />
        </nav>
    )

    /*
    return (
        <nav>
            <Grid container>
                <Grid item md={6}>
                    <NewerPost node={newerPost} />
                </Grid>
                <Grid item md={6} >
                    <OlderPost node={olderPost} />
                </Grid>

            </Grid>
        </nav>
    )
    */
}

export default PrevNextPost