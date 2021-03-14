import styled from '@emotion/styled'

import theme from '../styles/theme'

const light = theme.palette.primary.light
const dark = theme.palette.primary.dark

const PageTitle = styled.h1`
    margin-bottom: 0.8rem; 
    /* padding-left: 0.2rem; */
    padding: 0.4rem;
    font-weight: bold;
    box-shadow: 0px 1px rgb(0 0 0 / 10%);

    color: ${theme.palette.primary.contrastText};
    background: linear-gradient(to bottom,  ${light} 0%, ${dark} 100%); 
    

    a {
        text-decoration: none;
        /* color: ${theme.palette.text.primary}; */
        color: ${theme.palette.primary.contrastText}; 
    }
`

export default PageTitle