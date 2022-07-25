import {createTheme} from '@mui/material/styles';
import createSpacing from "@mui/system/createTheme/createSpacing";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary:{
            main: "rgb(33, 66, 82)",
            light: "rgb(83, 96, 120)",
            dark: "rgb(83, 96, 120)",
        },
        secondary:{
            main: "#fff",
            light:  "#fff",
            dark: "#fff",
        },
        background:{
            default:"#fff",
            paper: "#fff",
        },
        text: {
            primary: "#000",
            secondary: "#000",
            disabled:"#000",
        }
    },
    spacing: createSpacing(),
    shape: {
        borderRadius: 16
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
});

export default theme;