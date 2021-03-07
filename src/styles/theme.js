import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        //type: 'light' // 'light'(default) or 'dark'
        //type: 'dark',
        primary: {
            main: '#222277'
        }
        /*
        primary: {
            light: '#ffff8b',
            main: '#222277',
            dark: '#c9bc1f',
            contrastText: '#ffffff',
        }*/
    }
})
export default theme