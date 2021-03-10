import React from 'react'
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'

import Sidebar from './Sidebar'
import theme from '../styles/theme'

const cssMainPane = css`
    margin-top: 2rem;
`
const cssTableOfContents = css`
    position: sticky;
    top: 0;
    opacity: 0.8;
    li {
        /* font-size: 0.8rem; */
        a { 
            text-decoration: none; 
            color: ${theme.palette.text.primary};
        }
    }
`
const cssSidebar = css`
    margin-right: 2rem;
    /* font-size: 0.8rem; */

    
`

const Tree = ({ items }) => (
    <ol>
        {
            items.map(v => (
                <li key={v.url}>
                    <Typography>
                        <Link to={v.url}>{v.title}</Link>
                    </Typography>
                    {v.items && (<Tree items={v.items} />)}
                </li>
            ))
        }
    </ol>
)

const TableOfContents = ({ items }) => (
    <div css={cssTableOfContents}>
        <Typography variant="h3">Table of Contents</Typography>
        <Tree items={items || []} />
    </div>
)

////////////////////////////////////////////////////////////////
const MainPane = ({ children, tableOfContents }) => (
    <div css={cssMainPane}>
        <Container>
            <Grid container spacing={3}>
                <Hidden smDown>
                    <Grid item md={3} xs={false}>
                        <div css={cssSidebar}>
                            <Sidebar />
                        </div>
                    </Grid>
                </Hidden>

                <Grid item md={6} xs={12}>
                    {children}
                </Grid>

                <Hidden smDown>
                    <Grid item md={3} xs={12}>
                        {tableOfContents &&
                          (<TableOfContents items={tableOfContents.items} />)}
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    </div>
)

export default MainPane