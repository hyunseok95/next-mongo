import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {keyframes, styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {getPayloadProps} from "lib/store/reducer";
import {useAppSelector} from "lib/store";
import {patchUser} from "state/common/user";
import {postUser} from "handler/common/user";

const animation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const Body = styled(Box)(({theme})=>({
    width:"30rem",
    height:"35rem",
    margin:"5rem auto",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center",
    animation: `${animation} .5s`,
}))

const SignUpPage = () => {

    const user = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const router= useRouter();

    return (
        <Body>
            <Avatar  sx={{ m: "1rem" , bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
                Sign up
            </Typography>
            <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={ (event: any) =>
                    postUser(event, user, dispatch, router)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="Full Name"
                            required
                            fullWidth
                            id="Full Name"
                            label="Full Name"
                            autoFocus
                            value={user.name}
                            onChange={e => dispatch(patchUser(
                                getPayloadProps("name", e.currentTarget.value)))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="Phone Number"
                            label="Phone Number"
                            name="Phone Number"
                            autoComplete="Phone Number"
                            value={user.phone_number}
                            onChange={e => dispatch(patchUser(
                                getPayloadProps("phone_number", e.currentTarget.value)))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={user.email}
                            onChange={e => dispatch(patchUser(
                                getPayloadProps("email", e.currentTarget.value)))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={user.password}
                            onChange={e => dispatch(patchUser(
                                getPayloadProps("password", e.currentTarget.value)))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."/>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href='/sign-in'  ><a>
                            <Typography variant="body1">
                                Already have an account? Sign in
                            </Typography>
                        </a></Link>
                    </Grid>
                </Grid>
            </Box>
        </Body>
    )
}

export default SignUpPage;


