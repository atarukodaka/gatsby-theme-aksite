import { createMuiTheme } from '@material-ui/core/styles';

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
    typography: {
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
export default theme