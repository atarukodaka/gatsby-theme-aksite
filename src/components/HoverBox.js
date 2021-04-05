import styled from '@emotion/styled'

import theme from '../styles/theme'

const HoverBox = styled.div`
    &:hover {
    background-color: ${theme.palette.action.hover};
    opacity: 0.7;
    }
    a {
        text-decoration: none;
        color: ${theme.palette.text.primary}
    }
`

export default HoverBox