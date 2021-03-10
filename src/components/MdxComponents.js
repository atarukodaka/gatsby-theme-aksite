import React from 'react'
import { Link } from 'gatsby'
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'

import LinkPost from './LinkPost'
import LinkExternal from './LinkExternal'
import theme from '../styles/theme'
import Series from './Series'
import Baloon from './Baloon'

const numberingColor = theme.palette.text.secondary
const borderColor = theme.palette.action.active

const cssH2 = css`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${borderColor};

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

    counter-increment: h3;
    counter-reset: h4;

    &:before {
        color: ${numberingColor};
        font-size: large; 
        content: counter(h3) ". "; 
    }
)
`
const cssH4 = css`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${borderColor};

    counter-increment: h4;
    counter-reset: h5;

    &:before {
        color: ${numberingColor};
        font-size: large; 
        content: counter(h4) ". "; 
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
    return { Alert, Baloon, Box, Link, LinkPost, LinkExternal, Series, Grid,
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
     }
}

export default MdxComponents