import React from 'react'
import { Link } from "gatsby"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer, IconButton, Divider } from '@material-ui/core'
import { css } from '@emotion/react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

import Profile from './Profile'
import MonthlyArchives from './MonthlyArchives'
import DirectoryTree from './DirectoryTree'
import GoogleSearch from './GoogleSearch'
//import TagList from './TagList'
import theme from '../styles/theme'
import useSiteMetadata from '../hooks/useSiteMetadata'

const light = theme.palette.primary.light
const dark = theme.palette.primary.dark

const cssSiteTitle = css`
    border-bottom: 2px solid #111; 
    
    background: linear-gradient(to bottom,  ${light} 0%, ${dark} 100%); 

    h1 { 
        padding-top: 2rem;
        padding-bottom: 0.2rem;
    
        font-size: 2.5rem; 
    }
    h4 {
        margin-left: 2rem;
        font-style: italic;
    }

    a { 
        text-decoration: none;
        color: white;
    }
`
const HeaderPane = () => {
    const { title, description } = useSiteMetadata()
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const gcse_cx = process.env.GCSE_CX

    return (
        <header>
            <Hidden mdUp>
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton onClick={handleDrawerOpen} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <Button color="inherit" component={Link} to="/">{title}</Button>
                        <Button color="inherit" component={Link} to="/about">About</Button>
                    </Toolbar>
                </AppBar>
            </Hidden>

            <Drawer open={open}>
                <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                    <Divider />

                    <nav>
                        <h3>Profile</h3>
                        <Profile />
                        <Divider />
                        <h3>Directories</h3>
                        <DirectoryTree />
                        <Divider />
                        <h3>Monthly</h3>
                        <MonthlyArchives />
                        <GoogleSearch cx={gcse_cx} />

                        {/*
                        <h3>Tags</h3>
                        <TagList/>
                        */}
                    </nav>
                </div>
            </Drawer>

            <div css={cssSiteTitle}>
                <Hidden smDown>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item md={3}/>
                            <Grid item md={7}>
                                <Link to="/">
                                    <Typography variant="h1">{title}</Typography>
                                    { /* <Typography variant="h4">{description}</Typography> */}
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>
        </header>
    )
}

export default HeaderPane