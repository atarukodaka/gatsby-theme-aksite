import React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { css } from '@emotion/react'
import theme from '../styles/theme'

const cssItem = css`
    a {
        text-decoration: none;
        color: ${theme.palette.text.primary};
    }
    background: url(/icons/right_arrow.png) no-repeat;
    padding-top: 4px;
    opacity: 0.8;

`
const query = graphql`
{
    allMdx {
        group(field: frontmatter___series___title) {
          nodes {
            id
            slug
            frontmatter {
              series {
                number
              }
            }
          }
          seriesTitle: fieldValue
        }
    }
}
`

const SeriesList = () => {
    const { allMdx } = useStaticQuery(query)
    //const encodedTitle = encodeURIComponent(

    // TODO: encodeURIComponent, basePath

    return (
        <List>
            {
                allMdx.group.map(group => (
                    <ListItem css={cssItem}>
                        <Link to={`/series/${encodeURIComponent(group.seriesTitle)}`}>
                            {group.seriesTitle}
                        </Link>
                    </ListItem>
                ))

            }
        </List>)
}

export default SeriesList