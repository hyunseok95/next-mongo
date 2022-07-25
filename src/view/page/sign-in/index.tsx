import {keyframes, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "view/common/navbar";
import Footer from "view/common/footer";
import Intro from "view/page/sign-in/intro";
import SignIn from "view/page/sign-in/sign-in";

const animation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const Body = styled(Box)(({theme})=>({
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent:"center",
    alignItems: "center",
    alignContent:"center",
    animation: `${animation} .5s`,
}))

const Section = styled(Box)(({theme})=>({
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    height:"43rem",
    width:"60vw"
}))

const SignInPage = () => {
    return (
        <Body>
            <Navbar />
            <Box sx={{ height:"5rem"}} />
            <Section>
                <Intro />
                <Box sx={{flexGrow:1}} />
                <SignIn />
            </Section>
            <Footer css_state ="dark"/>
        </Body>
    )
}

export default SignInPage;


