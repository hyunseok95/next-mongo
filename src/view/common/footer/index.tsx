import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


interface FooterProps {
    css_state?: string;
}

const Body = styled(Box)<FooterProps>(({theme, css_state})=>({
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    width:"85vw",
    height:"10rem",
    color:`${css_state === "light" && theme.palette.secondary.main }`,
    '& span':{
        margin: "0 .5rem"
    }
}))

const Footer = ({css_state = "light"}: FooterProps) => {

    return (
            <Body css_state={css_state}>
                <Box sx={{flexGrow:1}}>
                    <Typography variant="body1" component="span">
                        CREATE TEAM
                    </Typography>
                    <Typography variant="body1" component="span">
                        ABOUT US
                    </Typography>
                    <Typography variant="body1" component="span">
                        BLOG
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" component="span">
                        © 2022, Designed by Hyuns
                    </Typography>
                    <Typography variant="body1" component="span">
                        . Coded by{" "}
                    </Typography>
                    <Typography variant="body1" component="span">
                        Creative Hyuns
                    </Typography>
                </Box>
            </Body>
    );
}
export default Footer;
