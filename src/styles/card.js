//import styled from '@emotion/styled'
import { css } from '@emotion/react'
import theme from '../styles/theme'

const styles = {
    directory: css`
        display: inline-block;
        background-color: ${theme.palette.action.hover};
        
        a {
            /*margin-left: 0.5rem;
            margin-right: 0.5rem;*/
            text-decoration: none;
            color: ${theme.palette.text.primary};

            &:hover {
                background-color: ${theme.palette.action.active};
            }
        }
    `,
    hover: css`
        &:hover {
            background-color: ${theme.palette.action.hover};
            opacity: 0.7;
        }
        a {
            text-decoration: none;
            color: ${theme.palette.text.primary}
        }
    `,
    card: css`
        padding: 0.5rem;
        box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
    `
}
export default styles