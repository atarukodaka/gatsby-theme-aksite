import styled from '@emotion/styled'

import theme from '../styles/theme'

const light = theme.palette.primary.light
const dark = theme.palette.primary.dark

const PageTitle = styled.h1`
    margin-bottom: 0.5rem;
    padding: 0.5em;
    font-weight: bold;

    color: ${theme.palette.primary.contrastText};
    background: linear-gradient(to bottom,  ${light} 0%, ${dark} 100%)

    /*background: ${theme.palette.primary.dark}; */
    /* color: ${theme.palette.text.primary}; */
    /* background: linear-gradient(to bottom,  #4848aa 0%, #222277 100%);   */
    /* color: white;  */
`

export default PageTitle