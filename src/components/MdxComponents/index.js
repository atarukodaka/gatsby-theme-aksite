import React from 'react'
import { Link } from 'gatsby'
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'
//import LinkPost from '../LinkPost'

import theme from '../../styles/theme'

import LinkOpenGraph from 'gatsby-plugin-aks-og-link'
//import LinkExternal from './LinkExternal'
import Series from './Series'
import Baloon from './Baloon'
import Spoiler from './Spoiler'
import Callout from './Callout'
import Asc256 from './Asc256'

const numberingColor = theme.palette.text.secondary
const borderColor = theme.palette.action.active

const cssH2 = css`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${borderColor};
    margin-top: 3rem;

    counter-increment: h2;
    counter-reset: h3;

    &:before {
        color: ${numberingColor};
        font-size: large; 
        content: counter(h2) ". "; 
    }
)
`

const cssH3 = css`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${borderColor};
    margin-top: 3rem;

    counter-increment: h3;
    counter-reset: h4;

    &:before {
        color: ${numberingColor};
        font-size: large; 
        content: counter(h2) "." counter(h3) ". "; 
    }
)
`
const cssH4 = css`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${borderColor};
    margin-top: 2rem;
    
    counter-increment: h4;
    counter-reset: h5;

    &:before {
        color: ${numberingColor};
        font-size: large; 
        content: counter(h2) "." counter(h3) "." counter(h4) ". "; 
    }
)
`
const Heading2 = ( { children, ...props}) =>
    (<Typography variant="h2" css={cssH2} {...props}>{children}</Typography>)
const Heading3 = ( { children, ...props}) =>
    (<Typography variant="h3" css={cssH3} {...props}>{children}</Typography>)
const Heading4 = ( { children, ...props}) =>
    (<Typography variant="h4" css={cssH4} {...props}>{children}</Typography>)


const MdxComponents = () => {
    return { Alert, Baloon, Box, Link, LinkOpenGraph, Series, Grid, Spoiler,
        Callout, Asc256, 
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
        //p: Typography,
     }
}

export default MdxComponents