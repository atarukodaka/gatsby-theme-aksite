import React from "react"
import { useStaticQuery, Link } from 'gatsby'
import { css } from '@emotion/react'
import Typography from '@material-ui/core/Typography'

import theme from '../styles/theme'

const cssDirectoryBox = css`
    display: inline-block;
    background-color: ${theme.palette.action.hover};
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    
    a {
        text-decoration: none;
        color: ${theme.palette.text.primary};

        &:hover {
            background-color: ${theme.palette.action.active};
        }
    }

`

const DirectoryBox = ({ directory, enableLink, ...rest }) => {
    const query = graphql`
    {
        directories: allAksDirectory { 
            nodes {
                id, name, label, fullLabel, pagePath, numberOfPosts
            }
        }
    }
    `
    const data = useStaticQuery(query)
    const dir_node = data.directories.nodes.find(v => v.name === directory)
    const FullLabel = ({ dir_node }) => (
        <Typography variant="caption">
            {dir_node.fullLabel}
        </Typography>
    )

    return (dir_node) ?
        (<div css={cssDirectoryBox} {...rest}>
            { (enableLink) ?
                (<Link to={dir_node.pagePath}><FullLabel dir_node={dir_node} /></Link>)
                : (<FullLabel dir_node={dir_node} />)
            }
        </div>)
        : null
}
export default DirectoryBox