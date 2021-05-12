import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const theme = createMuiTheme({
    palette: {
        //type: 'light' // 'light'(default) or 'dark'
        //type: 'dark',
        primary: {
            main: '#222277'
        },
        /*
        primary: {
            light: '#ffff8b',
            main: '#222277',
            dark: '#c9bc1f',
            contrastText: '#ffffff',
        }*/
    },
    breakpoints: {
        values: {
    
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
   
            /*
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1280,
            */
        },
    },
    
    typography: {
        body2: {
            fontSize: "1rem"
        },
        fontFamily: [
            "Segoe UI", "Meiryo",
            "Avenir Next",
            "Helvetica Neue",
            "Segoe UI",
            "Helvetica",
            "Arial",
            "sans-serif",
        ].join(','),
        h1: {
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "2rem",
        },
        h2: {
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginTop: "3rem",
            marginBottom: "1.6rem",
        },
        h3: {
            fontSize: "1.45rem",
            fontWeight: "bold",
            marginTop: "1rem",
            marginBottom: "1rem",
        },
        h4: {
            fontSize: "1.4rem",
            fontWeight: "bold",
            marginTop: "1rem",
            marginBottom: "1rem",
        },


    }
})
export const isMobile = () => {

    
    return useMediaQuery(theme.breakpoints.down('sm'))
}
export default theme