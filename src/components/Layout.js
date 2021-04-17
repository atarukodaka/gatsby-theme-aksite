import React from "react"

import HeaderPane from './HeaderPane'
import MainPane from './MainPane'
import FooterPane from './FooterPane'
import { css } from '@emotion/react'
import  styled  from '@emotion/styled'
import theme from '../styles/theme'
import { Link } from "gatsby"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer, IconButton, Divider } from '@material-ui/core'
import Sidebar from './Sidebar'
import useSiteMetadata from '../hooks/useSiteMetadata'
    
const StyledButton = styled.button`
${ ( { theme } ) => `
    color: red;
    ${theme.breakpoints.up('sm')} {
        color: blue;
    }
    `
}
`

const cssRoot = css`
    display: flex;
`
const cssToolbar = css`
    height: 64px;
`
const cssSidebar = css`
    width: 240px;
    padding-left: 2rem;
    padding-right: 2rem;
`
const cssMain = css`
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
`
const cssToc = css`
    width: 175px;
    top: 1rem;
    position: sticky;
    height: calc(100vh - 70px);
    overflow-y: auto;
    flex-shrink: 0;
`
const drawer = (
    <nav>
        <Sidebar/>
    </nav>
)
const Layout = ( {children, ...props} ) => {
    const { title, description } = useSiteMetadata()

    return (
        <div css={cssRoot}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit" component={Link} to="/">{title}</Button>
                </Toolbar>
            </AppBar>
            
            <div css={cssSidebar}>
                <div css={cssToolbar}/>
                {drawer}
            </div>

            <div css={cssMain}>
            <div css={cssToolbar}/>
                {children}
                <FooterPane/>
            </div>
            
            <div css={cssToc}>
                <div css={cssToolbar}/>
                TOC
            </div>
            
        </div>
    )
}
export default Layout
