import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        //type: 'light' // 'light'(default) or 'dark'
        type: 'dark',
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
        ].join(',')
    }
})
export default theme