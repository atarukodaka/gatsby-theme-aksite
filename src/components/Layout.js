import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'

import Sidebar from './Sidebar'
import TableOfContents from './TableOfContents'
import theme from '../styles/theme'
import useSiteMetadata from '../hooks/useSiteMetadata'
import FooterPane from './FooterPane'
/*
  almost incorporated from https://material-ui.com/components/drawers/
 */

const drawerWidth = 240;
const tocWidth = 240; //240;
const mainMaxWidth = 660;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        paddingLeft: "1rem",
    },
    content: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        padding: '0.5rem',
        
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px - ${tocWidth}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        
    },
    container: {
        [theme.breakpoints.up('md')]: {
            maxWidth: mainMaxWidth,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    tableOfContents: {
        width: `${tocWidth}px`,
        top: "10px",
        position: "sticky",
        height: `calc(100vh - 70px)`,
    },
}));

const Layout = ({ children, tableOfContents, window, ...props }) => {
    const { title } = useSiteMetadata()
    //const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h3" noWrap>
                        {title}
                    </Typography>

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <Sidebar />
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >

                        <div className={classes.toolbar}>
                            { /* <Typography variant="h3">{title}</Typography> */}
                        </div>

                        <Divider />
                        <Sidebar />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.container}>
                    {children}
                </div>
                <FooterPane />
            </main>

            
            <Hidden smDown>
                <div className={classes.tableOfContents}>
                    <div className={classes.toolbar} />
                    <TableOfContents contents={tableOfContents} />
                </div>
            </Hidden>
            
        </div>
    );
}

export default Layout

/*
const StyledButton = styled.button`
${ ( { theme } ) => `
    color: red;
    ${theme.breakpoints.up('sm')} {
        color: blue;
    }
    `
}
`

*/

